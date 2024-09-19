import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Card, Title, Paragraph, TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopStories, setCategory } from "../redux/newsSlice";
import { RootState } from "../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/StackNavigator";
import * as WebBrowser from "expo-web-browser";

type NewsScreenNavigationProp = StackNavigationProp<RootStackParamList, "News">;

type Props = {
  navigation: NewsScreenNavigationProp;
};

const NewsCard = ({ item, handleCardPress }: any) => (
  <TouchableRipple
    onPress={() => handleCardPress(item.url)}
    rippleColor="rgba(0, 0, 0, .32)"
  >
    <Card style={styles.card}>
      {item.urlToImage && (
        <Card.Cover source={{ uri: item.urlToImage }} style={styles.image} />
      )}
      <Card.Content>
        <Title style={styles.title}>{item.title}</Title>
        <Paragraph style={styles.subtitle}>
          Source: {item.by} | Score: {item.score}
        </Paragraph>
      </Card.Content>
    </Card>
  </TouchableRipple>
);

export default function NewsScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const { stories, category } = useSelector((state: RootState) => state.news);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadInitialStories = async () => {
      setIsLoading(true);
      await dispatch(fetchTopStories());
      setIsLoading(false);
    };
    loadInitialStories();
  }, [category]);

  const loadMoreStories = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;
    await dispatch(fetchTopStories());
    setCurrentPage(nextPage);
    setIsLoading(false);
  };

  const refreshStories = async () => {
    setRefreshing(true);
    await dispatch(fetchTopStories(true));
    setRefreshing(false);
  };

  const handleCardPress = async (url: string) => {
    const result = await WebBrowser.openBrowserAsync(url);

    if (result.type === "cancel") {
      navigation.navigate("News");
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    dispatch(setCategory(newCategory));
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          onPress={() => handleCategoryChange("top")}
          style={[
            styles.categoryButton,
            category === "top" && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryButtonText,
              category === "top" && styles.selectedCategoryButtonText,
            ]}
          >
            Top Stories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleCategoryChange("new")}
          style={[
            styles.categoryButton,
            category === "new" && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryButtonText,
              category === "new" && styles.selectedCategoryButtonText,
            ]}
          >
            New Stories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleCategoryChange("ask")}
          style={[
            styles.categoryButton,
            category === "ask" && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryButtonText,
              category === "ask" && styles.selectedCategoryButtonText,
            ]}
          >
            Ask HN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleCategoryChange("show")}
          style={[
            styles.categoryButton,
            category === "show" && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryButtonText,
              category === "show" && styles.selectedCategoryButtonText,
            ]}
          >
            Show HN
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={stories}
        renderItem={({ item }) => (
          <NewsCard item={item} handleCardPress={handleCardPress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreStories}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isLoading ? (
            <ActivityIndicator
              style={{ marginVertical: 20 }}
              size="large"
              color="blue"
            />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshStories}
            tintColor="blue"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#6200ee",
    borderWidth: 1,
  },
  selectedCategoryButton: {
    backgroundColor: "#6200ee",
  },
  categoryButtonText: {
    color: "#6200ee",
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
  card: {
    margin: 10,
    borderRadius: 8,
    elevation: 4,
    color: "fff",
  },
  image: {
    height: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#757575",
  },
});
