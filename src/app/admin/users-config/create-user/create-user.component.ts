import { Component } from '@angular/core';
import { FormGroup, Validators,FormControl} from '@angular/forms';
import { UserService } from '../../../Services/user.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent{
  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
   address: new FormControl('', Validators.required),
  });

// call in the user.service.ts file on construction of this component
  constructor(public userService: UserService) { }

  onSubmit() {
  // logging the form on submission tells us how to get to the email,passward, firstname, lastname,address values
  console.log(this.userForm);
  // send the email,passward, firstname, lastname,address to our service, where we will eventually do an http post
  this.userService.createUser(this.userForm.value.email,
                              this.userForm.value.password,
                              this.userForm.value.firstname,
                              this.userForm.value.lastname,
                              this.userForm.value.lastname
      );
    }
}
