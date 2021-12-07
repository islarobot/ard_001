// Servo - Version: Latest 
#include <Servo.h>

const int Trigger = 2;   //Pin digital 2 para el Trigger del sensor
const int Echo = 3;   //Pin digital 3 para el echo del sensor

int a=1;
int total_a = 160;
int max_a = total_a/2;
//int min_a = -1*max_a;
int min_a = 1;


int d=0;


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
    
    
    if(d==0){a=a+1;
    if(a>max_a){d=1;}
    }
    if(d==1){a=a-1;
    if(a<min_a){d=0;}
    }   
    
  long t;
  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);          //Enviamos un pulso de 10us
  digitalWrite(Trigger, LOW);
      
  t = pulseIn(Echo, HIGH); //obtenemos el ancho del pulso
  if((t<200) || (t>2000)){t=9999;}
 


Serial.print(t);
Serial.print(F(" "));
Serial.println(a);

      
      //Serial.print(distance);
      
      //Serial.println(outputD);
      
      delay(200);
  
}
