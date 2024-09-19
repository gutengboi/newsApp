import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>I am Ainmashaun Olayinka</Text>
      <Text style={styles.paragraph}>
        Hello! I'm a passionate mobile app developer with experience in building high-quality applications. I specialize in creating seamless and engaging user experiences using modern technologies such as React Native and Redux. My goal is to deliver efficient and effective solutions that meet user needs and exceed expectations.
      </Text>
      <Text style={styles.paragraph}>
        With a strong background in software development and a keen eye for detail, I strive to stay up-to-date with the latest industry trends and best practices. Whether it's developing a new feature, optimizing performance, or debugging complex issues, I am dedicated to delivering top-notch solutions that drive success.
      </Text>
      <Text style={styles.paragraph}>
        Thank you for visiting my about page. Feel free to reach out if you have any questions.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default AboutScreen;
