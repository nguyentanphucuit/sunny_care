import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ConsentScreen = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleAccept = () => {};

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

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsChecked(!isChecked)}>
            <View
              style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
            <Text style={styles.checkboxText}>
              I agree to share personal information with the service provider
              Sunny Care and understand that the information will be kept
              confidential.
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.declineButton}>
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.acceptButton,
              !isChecked && styles.acceptButtonDisabled,
            ]}
            disabled={!isChecked}
            onPress={handleAccept}>
            <Text
              style={[
                styles.acceptButtonText,
                !isChecked && styles.acceptButtonTextDisabled,
              ]}>
              Accept
            </Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
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
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#dc3545",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#dc3545",
    fontSize: 24,
    fontWeight: "500",
    fontStyle: "italic",
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
    width: 20,
    height: 20,
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
  acceptButtonDisabled: {
    backgroundColor: "#95a5a6",
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  acceptButtonTextDisabled: {
    color: "#ecf0f1",
  },
});

export default ConsentScreen;
