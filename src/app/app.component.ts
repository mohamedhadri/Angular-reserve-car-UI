import { Component,OnInit } from '@angular/core';
import data from "../db/data.json";
import { FormGroup,FormControl,  FormBuilder,  Validators } from '@angular/forms';
 
@Component({
  selector: 'app-root',
  template: `
  <app-mycard [childMessage]="parentMessage"></app-mycard>
`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit  {

	//working fetch req but with no data populated
	productsArray: any=[]
	async ngOnInit():  Promise<any> {
	await  fetch('./assets/data.json').then(res => res.json())
	  .then(jsonData => {
		return	this.productsArray = JSON.stringify(jsonData.map((x: { name: any; })=> x.name)) 
		
	  });
	}

	 // custom Date func
	 now = new Date();
	 padTo2Digits(num: number) {
		 return num.toString().padStart(2, '0');
	   }
 
	   formatDate(date: Date) {
		 return (
		   [
			 date.getFullYear(),
			 this.padTo2Digits(date.getMonth() + 1),
			 this.padTo2Digits(date.getDate()),
		   ].join('-') +
		   ' ' +
		   [
			  this.padTo2Digits(date.getHours()),
			  this.padTo2Digits(date.getMinutes()),
			 
		   ].join(':')
		 );
	   }


	//all data consts init
	selectedCar: String = "Category";
	cars: Array<any> = data;
	models: Array<any> = []; 
	pickups: Array<any> = [];  
	dropoff: Array<any> = [];  
	
	
	//called to populate the models 
	changeCar(newCar: any) { 
		this.models = this.cars.find((car: any) => car.name == newCar.target.value).models; 	
	
	}
	//called to populate the pickups and dropoffs 
		 changeModel(state: any) { 
		this.pickups = this.cars
		.find((car: any) => car.name == this.selectedCar).pickup;
		this.dropoff = this.cars
		.find((car: any) => car.name == this.selectedCar).dropoff;
	}
 
	
	  //form group
	//   addCar= new FormGroup({
	// 	clientCar:new FormControl(''),
	// 	clientCarModel:new FormControl('Select your Car'),
	// 	pickup:new FormControl('PICKUP'),
	// 	pickupDate:new FormControl(this.formatDate(this.now)),
	// 	pickupTime:new FormControl(this.formatDate(this.now)),
	// 	dropofDate:new FormControl(this.formatDate(this.now)),
	// 	dropofTime:new FormControl(this.formatDate(this.now)),
	// 	dropof:new FormControl('DROPOFF'),
	// 	clientName:new FormControl(''),
	// 	clientEmail:new FormControl(''),
	// 	clientNumber:new FormControl(''),
	//   })

	newcarform:any= FormGroup;

	  saveData(){
		console.log(this.newcarform.value)
	  }

	  
	  
	  constructor(private fb: FormBuilder) {
		this.createForm();
	  }
	   createForm() {
		this.newcarform = this.fb.group({
			
		   clientNumber: ['', Validators.required ],
		   clientEmail: ['', Validators.required ],
		   clientName: ['', Validators.required ],
		   clientCar: ['', Validators.required ],
		   clientCarModel: ['', Validators.required ],
		   pickup: ['', Validators.required ],
		   pickupDate: ['', Validators.required ],
		 
		   dropof: ['', Validators.required ],
		   dropofDate: ['', Validators.required ],
		
		   
		   
		});
	  }
	   
}


