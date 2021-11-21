// Servo - Version: Latest 
#include <Servo.h>

const int Trigger = 2;   //Pin digital 2 para el Trigger del sensor
const int Echo = 3;   //Pin digital 3 para el echo del sensor

int max_dist = 0;
int min_dist = -99999;

Servo servoMotor;

char *result = malloc(4);
String readString;
String param;
String angleString;
int angleFloat;
int angleInt;
String angleSign;


float output = 0;
int output_int = 0;

float rad_angle = 0;

String outputString;

String directionString;

int largo;

void setup() {

servoMotor.attach(9);

Serial.begin(115200);

pinMode(Trigger, OUTPUT); //pin como salida
pinMode(Echo, INPUT);  //pin como entrada
digitalWrite(Trigger, LOW);//Inicializamos el pin con 0
    
}

void loop() {
  

  
if (Serial.available() > 0) {
  

      delay(2);
      readString = Serial.readStringUntil('\n');
     
      }
      param = readString.substring(0,1);
      
      angleSign = readString.substring(1,2);
      angleString = readString.substring(2,5);
      angleInt = angleString.toInt();
      //angleFloat = angleFloat/10;
      
      if(angleSign == 'n'){ angleInt = angleInt*(-1);}
      //angleInt = (int) angleFloat;
      servoMotor.write(angleInt);
      
      digitalWrite(Trigger, HIGH);
      delayMicroseconds(10);          //Enviamos un pulso de 10us
      digitalWrite(Trigger, LOW);
      long t, distanceCm;
      t = pulseIn(Echo, HIGH); //obtenemos el ancho del pulso
     
      if((t<200) || (t>2000)){t=9999;}

      //output = abs(100*sin(rad_angle));
      //output_int = (int) output;
      outputString = String(t);
      
      //if(outputString.length()==1){outputString = '0000'+outputString;}
      
      if(outputString.length()==1){outputString = '000'+outputString;}
      if(outputString.length()==2){outputString = '00'+outputString;}
      if(outputString.length()==3){outputString = '0'+outputString;}
      
      
   
      Serial.print('A');

      Serial.println(outputString);

}
