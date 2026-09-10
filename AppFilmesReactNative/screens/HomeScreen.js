import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Searchbar,
  Snackbar,
  Text,
} from "react-native-paper";

import { searchMovies } from "../services/omdb";

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("spider man");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMovies(title = search) {
    if (!title.trim()) {
      setError("Digite o nome de um filme.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const result = await searchMovies(title);
      setMovies(result);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies("spider man");
  }, []);

  function renderMovie({ item }) {
    return (
      <Card
        style={styles.card}
        onPress={() =>
          navigation.navigate("Details", { imdbID: item.imdbID })
        }
      >
        {item.Poster && item.Poster !== "N/A" ? (
          <Card.Cover source={{ uri: item.Poster }} />
        ) : (
          <View style={styles.noPoster}>
            <Text variant="bodyMedium">Sem pôster</Text>
          </View>
        )}

        <Card.Content style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {item.Title}
          </Text>
          <Text variant="bodyMedium">
            Ano: {item.Year}
          </Text>
          <Text variant="bodySmall">
            Tipo: {item.Type === "movie" ? "Filme" : item.Type}
          </Text>
        </Card.Content>

        <Card.Actions>
          <Button
            mode="text"
            onPress={() =>
              navigation.navigate("Details", { imdbID: item.imdbID })
            }
          >
            Ver detalhes
          </Button>
        </Card.Actions>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        🎬 Catálogo de Filmes
      </Text>

      <Searchbar
        placeholder="Digite o nome do filme"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={() => loadMovies()}
        style={styles.search}
      />

      <Button
        mode="contained"
        onPress={() => loadMovies()}
        loading={loading}
        disabled={loading}
        style={styles.searchButton}
      >
        Buscar filmes
      </Button>

      {loading && movies.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Buscando filmes...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderMovie}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Snackbar
        visible={Boolean(error)}
        onDismiss={() => setError("")}
        duration={3500}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  search: {
    marginBottom: 10,
  },
  searchButton: {
    marginBottom: 12,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    marginBottom: 16,
    overflow: "hidden",
  },
  content: {
    paddingTop: 12,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  noPoster: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
  },
});
