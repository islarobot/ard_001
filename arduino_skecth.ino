// Servo - Version: Latest 
#include <Servo.h>

const int Trigger = 2;   //Pin digital 2 para el Trigger del sensor
const int Echo = 3;   //Pin digital 3 para el echo del sensor

int a=1;
int d=0;

String outputString;
String angle;
String distance;
String outputD;
String outputA;

Servo servoMotor;


void setup() {

servoMotor.attach(9);

Serial.begin(115200);

pinMode(Trigger, OUTPUT); //pin como salida
pinMode(Echo, INPUT);  //pin como entrada
digitalWrite(Trigger, LOW);//Inicializamos el pin con 0
    
}

void loop() {

    

     
    servoMotor.write(a);
    
    
    if(d==0){a=a+2;
    if(a>176){d=1;}
    }
    if(d==1){a=a-2;
    if(a<4){d=0;}
    }   
    
  long t;
  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);          //Enviamos un pulso de 10us
  digitalWrite(Trigger, LOW);
      
  t = pulseIn(Echo, HIGH); //obtenemos el ancho del pulso
  if((t<200) || (t>2000)){t=9999;}
  distance = String(t);
      if(distance.length()==1){distance = '000'+distance;}
      if(distance.length()==2){distance = '00'+distance;}
      if(distance.length()==3){distance = '0'+distance;}

  angle = String(a);
      if(angle.length()==1){angle = '00'+angle;}
      if(angle.length()==2){angle = '0'+angle;}

      outputD = distance+angle;
      outputA = angle;

      
      //Serial.print(distance);
      
      Serial.println(outputD);
      
      delay(300);
  
}

