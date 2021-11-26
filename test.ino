


void setup() {



Serial.begin(115200);


    
}

void loop() {


  writeIntAsBinary(4);
}

void writeIntAsBinary(int value){
    Serial.write(lowByte(value));
    Serial.write(highByte(value));
}