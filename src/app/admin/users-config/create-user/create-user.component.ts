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
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  // call in the user.service.ts file on construction of this component
  constructor(public userService: UserService) { }

  onSubmit() {
    // logging the form on submission tells us how to get to the userId,password, firstName, lastName,address,email values
    console.log(this.userForm);
    // send the userId,password, firstName, lastName, address,email to our service, where we will eventually do an http post
    this.userService.createUser(this.userForm.value.userId,
                                this.userForm.value.password,
                                this.userForm.value.firstName,
                                this.userForm.value.lastName,
                                this.userForm.value.address,
                                this.userForm.value.email
    );
    this.userService.setDisplayListStatus(true);
    this.userService.setDisplayCreateStatus(false);
    console.log(this.userService.displayList);
    console.log(this.userService.displayCreate);
  }
}
