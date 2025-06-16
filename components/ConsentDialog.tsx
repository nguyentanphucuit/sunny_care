import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function CustomCheckbox({
  isChecked,
  onPress,
}: {
  isChecked: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.checkbox,
        isChecked && styles.checkboxChecked,
        pressed && styles.checkboxPressed,
      ]}>
      {isChecked && <Text style={styles.checkmark}>✓</Text>}
    </Pressable>
  );
}

const ConsentScreen = () => {
  const [isChecked, setIsChecked] = useState(true);
  const router = useRouter();

  const handleAccept = async () => {
    try {
      const now = new Date();
      const consentData = {
        isConsent: true,
        timestamp: now.toISOString(),
        formattedDate: now.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      };

      await AsyncStorage.setItem("userConsent", JSON.stringify(consentData));
      router.replace("/");
    } catch (error) {
      console.error("Error saving consent:", error);
    }
  };

  const handleDecline = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <Image
            source={require("../assets/images/Info_icon.png")}
            style={styles.iconContainer}
          />

          <Text style={styles.title}>
            Consent to Share Personal Information
          </Text>

          <Text style={styles.bodyText}>
            By confirming the booking for psychological counselling services,
            you agree to share your personal information with the service
            provider Sunny Care, and allow Sunny Care to use this information
            solely for the purpose of delivering psychological counselling
            services. All personal data will be kept strictly confidential and{" "}
            <Text style={styles.bodyTextBold}>
              will not be shared with any third party other than Sunny Care.
            </Text>
          </Text>

          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              isChecked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
            <Text style={styles.checkboxText}>
              I agree to share personal information with the service provider
              Sunny Care and understand that the information will be kept
              confidential.
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={handleDecline}>
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          {isChecked && (
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 32,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 20,
    width: 56,
    height: 56,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#E01717",
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  bodyTextBold: {
    fontWeight: "500",
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#454545",
    fontWeight: "400",
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 40,
    marginTop: 20,
    width: "100%",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#27ae60",
    borderColor: "#27ae60",
  },
  checkboxPressed: {
    opacity: 0.7,
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: "#7B7B7B",
    fontWeight: "400",
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
    gap: 16,
  },
  declineButton: {
    paddingVertical: 16,
    borderWidth: 0,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  declineButtonText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
  },
  acceptButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#28a745",
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ConsentScreen;
