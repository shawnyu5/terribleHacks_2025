#include <SPI.h>
#include <MFRC522.h>
#include <Keyboard.h> // Include the Keyboard library

#define SS_PIN 10
#define RST_PIN 9

MFRC522 rfid(SS_PIN, RST_PIN);

// Authorized UIDs (add yours here)
byte authorizedUIDs[][4] = {
  {0xFF, 0xDD, 0x4D, 0x1E},  // Your tag
  {0xAB, 0xCD, 0xEF, 0x12}   // Example tag
};

void setup() {
  // Keep Serial for debugging if needed, but not strictly necessary for the keystroke
  Serial.begin(9600);
  // while (!Serial); // You might want to remove or comment this out if you don't want to wait for Serial Monitor

  SPI.begin();
  rfid.PCD_Init();

  // Initialize the Keyboard emulation
  Keyboard.begin();

  Serial.println("RFID Reader Initialized - Waiting for tag..."); // Optional feedback
}

void loop() {
  // Look for new cards
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    Serial.print("Tag detected, UID: "); // Optional: Print UID for debugging
    for (byte i = 0; i < rfid.uid.size; i++) {
       Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
       Serial.print(rfid.uid.uidByte[i], HEX);
    }
    Serial.println();

    // Check against authorized UIDs
    bool isAuthorized = false;
    // Loop through the number of authorized UIDs. sizeof(authorizedUIDs) gives the total bytes,
    // sizeof(authorizedUIDs[0]) gives the bytes for one UID (which is 4).
    for (byte j = 0; j < (sizeof(authorizedUIDs) / sizeof(authorizedUIDs[0])); j++) {
      bool match = true;
      // Compare the detected UID with the current authorized UID
      for (byte i = 0; i < rfid.uid.size; i++) { // Use rfid.uid.size for comparison length
        // Only compare up to the number of bytes in the stored UIDs (4 in this case)
        if (i >= sizeof(authorizedUIDs[0]) || rfid.uid.uidByte[i] != authorizedUIDs[j][i]) {
          match = false;
          break;
        }
      }
      if (match) {
        isAuthorized = true;
        break; // Exit the loop once a match is found
      }
    }

    // If the UID is authorized, send the F20 keystroke
    if (isAuthorized) {
      Serial.println("Access Granted - Sending F20 keypress."); // Optional feedback
      Keyboard.press(KEY_F20);   // Press the F20 key
      delay(50);                 // Short delay between press and release
      Keyboard.releaseAll();     // Release all pressed keys
    } else {
      Serial.println("Access Denied."); // Optional feedback for unauthorized tags
      // Optionally add an action for unauthorized tags, like blinking an LED
    }

    rfid.PICC_HaltA();  // Halt PICC
    rfid.PCD_StopCrypto1(); // Stop encryption on PCD
  }
  // Add a small delay to avoid constant checking when no card is present
  delay(100);
}