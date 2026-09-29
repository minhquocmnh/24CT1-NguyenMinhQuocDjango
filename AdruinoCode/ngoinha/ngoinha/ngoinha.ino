#include <ESP8266WiFi.h>
#include <SinricPro.h>
#include <SinricProSwitch.h>

// ===== 1. CẤU HÌNH WIFI =====
const char* ssid = "ASUS";        // Tên WiFi của bạn
const char* password = "12345678"; // Mật khẩu WiFi

// ===== 2. THÔNG TIN SINRIC PRO =====
#define APP_KEY       "76b881c9-048b-4828-98d8-a88ce9fbd5d3"
#define APP_SECRET    "defcc28a-547c-4714-8bf9-f10f9b30a1c1-a853bf7b-8b72-4d23-9855-51628e07ab32"

// ID của 3 thiết bị
#define LIGHT1_ID     "6ab47de121568291be147999" // Light 1
#define LIGHT2_ID     "6ab4990296dc1ddeb064c7f0" // Light 2
#define DOOR_ID       "6ab498d321568291be14a2fe" // Door

// ===== 3. CẤU HÌNH CHÂN GPIO ĐIỀU KHIỂN RELAY =====
// Bạn có thể đổi các chân D1, D2, D5 tùy theo cách bạn cắm dây thực tế
const int LIGHT1_PIN = D1; // Chân cho Light 1
const int LIGHT2_PIN = D2; // Chân cho Light 2
const int DOOR_PIN   = D5; // Chân cho Door (Cửa/Khóa điện)

#define BAUD_RATE     115200

// --- Callback xử lý Đèn 1 (Light 1) ---
bool onLight1PowerState(const String &deviceId, bool &state) {
  Serial.printf("Light 1 %s: %s\r\n", deviceId.c_str(), state ? "ON" : "OFF");
  digitalWrite(LIGHT1_PIN, state ? LOW : HIGH); // Relay kích mức thấp (Active LOW)
  return true;
}

// --- Callback xử lý Đèn 2 (Light 2) ---
bool onLight2PowerState(const String &deviceId, bool &state) {
  Serial.printf("Light 2 %s: %s\r\n", deviceId.c_str(), state ? "ON" : "OFF");
  digitalWrite(LIGHT2_PIN, state ? LOW : HIGH);
  return true;
}

// --- Callback xử lý Cửa (Door) ---
bool onDoorPowerState(const String &deviceId, bool &state) {
  Serial.printf("Door %s: %s\r\n", deviceId.c_str(), state ? "OPEN/ON" : "CLOSE/OFF");
  digitalWrite(DOOR_PIN, state ? LOW : HIGH);
  return true;
}

// Hàm kết nối WiFi
void setupWiFi() {
  Serial.printf("\r\n[WiFi]: Dang ket noi toi %s", ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  Serial.printf(" Ket noi thanh cong!\r\n[WiFi]: IP: %s\r\n", WiFi.localIP().toString().c_str());
}

// Hàm đăng ký thiết bị với SinricPro
void setupSinricPro() {
  // 1. Đăng ký Light 1
  SinricProSwitch& light1Switch = SinricPro[LIGHT1_ID];
  light1Switch.onPowerState(onLight1PowerState);

  // 2. Đăng ký Light 2
  SinricProSwitch& light2Switch = SinricPro[LIGHT2_ID];
  light2Switch.onPowerState(onLight2PowerState);

  // 3. Đăng ký Door
  SinricProSwitch& doorSwitch = SinricPro[DOOR_ID];
  doorSwitch.onPowerState(onDoorPowerState);

  // Trạng thái kết nối Server
  SinricPro.onConnected([](){ 
    Serial.printf("Da ket noi thanh cong toi SinricPro Cloud!\r\n"); 
  }); 
  SinricPro.onDisconnected([](){ 
    Serial.printf("Mat ket noi toi SinricPro Cloud!\r\n"); 
  });

  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setup() {
  Serial.begin(BAUD_RATE);

  // Cấu hình OUTPUT cho các chân
  pinMode(LIGHT1_PIN, OUTPUT);
  pinMode(LIGHT2_PIN, OUTPUT);
  pinMode(DOOR_PIN, OUTPUT);

  // Mặc định ban đầu tắt tất cả thiết bị (kích mức THẤP nên xuất HIGH là TẮT)
  digitalWrite(LIGHT1_PIN, HIGH);
  digitalWrite(LIGHT2_PIN, HIGH);
  digitalWrite(DOOR_PIN, HIGH);

  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}