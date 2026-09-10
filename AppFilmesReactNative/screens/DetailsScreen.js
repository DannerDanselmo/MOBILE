import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  Text,
} from "react-native-paper";

import { getMovieDetails } from "../services/omdb";

export default function DetailsScreen({ route, navigation }) {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await getMovieDetails(imdbID);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [imdbID]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.center}>
        <Text variant="titleMedium">{error || "Filme não encontrado."}</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Voltar
        </Button>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movie.Poster && movie.Poster !== "N/A" && (
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {movie.Title}
          </Text>

          <View style={styles.chips}>
            <Chip icon="calendar">{movie.Year}</Chip>
            <Chip icon="star">{movie.imdbRating}</Chip>
            <Chip>{movie.Runtime}</Chip>
          </View>

          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.label}>
            Sinopse
          </Text>
          <Text variant="bodyLarge">{movie.Plot}</Text>

          <Text variant="titleMedium" style={styles.label}>
            Gênero
          </Text>
          <Text variant="bodyLarge">{movie.Genre}</Text>

          <Text variant="titleMedium" style={styles.label}>
            Diretor
          </Text>
          <Text variant="bodyLarge">{movie.Director}</Text>

          <Text variant="titleMedium" style={styles.label}>
            Atores
          </Text>
          <Text variant="bodyLarge">{movie.Actors}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        Voltar para a lista
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  poster: {
    width: "100%",
    height: 480,
    resizeMode: "contain",
    backgroundColor: "#e5e7eb",
    marginBottom: 16,
    borderRadius: 8,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  divider: {
    marginVertical: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  backButton: {
    marginBottom: 24,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  loadingText: {
    marginTop: 8,
  },
});
