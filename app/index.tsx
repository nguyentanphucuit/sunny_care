import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ConsentData = {
  isConsent: boolean;
  timestamp: string;
  formattedDate: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const [consentData, setConsentData] = useState<ConsentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkConsentStatus();
  }, []);

  const checkConsentStatus = async () => {
    try {
      const storedConsent = await AsyncStorage.getItem("userConsent");
      if (storedConsent) {
        setConsentData(JSON.parse(storedConsent));
      }
    } catch (error) {
      console.error("Error reading consent status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sunny Care</Text>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Your Mental Health Journey Starts Here
        </Text>

        {consentData ? (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Consent Status</Text>
              <Text style={styles.cardText}>
                You have {consentData.isConsent ? "accepted" : "declined"}{" "}
                consent
              </Text>
              <Text style={[styles.cardText, styles.timestamp]}>
                Time: {consentData.formattedDate}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Upcoming Sessions</Text>
              <Text style={styles.cardText}>No upcoming sessions</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Quick Actions</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/consent")}>
                <Text style={styles.buttonText}>Update Consent</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consent Required</Text>
            <Text style={styles.cardText}>
              Please provide your consent to continue using the app.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/consent")}>
              <Text style={styles.buttonText}>Provide Consent</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28a745",
    marginTop: 40,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    gap: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
  },
  timestamp: {
    marginTop: 8,
    color: "#888",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
