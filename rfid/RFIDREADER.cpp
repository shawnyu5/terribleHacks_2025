#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9

MFRC522 rfid(SS_PIN, RST_PIN);

// Authorized UIDs (add yours here)
byte authorizedUIDs[][4] = {
  {0xFF, 0xDD, 0x4D, 0x1E},  // Your tag
  {0xAB, 0xCD, 0xEF, 0x12}   // Example tag
};

void setup() {
  Serial.begin(9600);
  while (!Serial); // Wait for Serial Monitor (Leonardo/Micro)
  
  SPI.begin();
  rfid.PCD_Init();
}

void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    // Check against authorized UIDs
    bool isAuthorized = false;
    for (byte j = 0; j < sizeof(authorizedUIDs) / 4; j++) {
      bool match = true;
      for (byte i = 0; i < 4; i++) {
        if (rfid.uid.uidByte[i] != authorizedUIDs[j][i]) {
          match = false;
          break;
        }
      }
      if (match) {
        isAuthorized = true;
        break;
      }
    }

    // Print ONLY True/False to stdout (Serial)
    Serial.println(isAuthorized ? "True" : "False");

    rfid.PICC_HaltA();  // Stop reading
  }
  delay(500); // Prevent spamming
}