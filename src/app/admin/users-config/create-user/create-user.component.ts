import { Component ,OnInit} from '@angular/core';
import { FormGroup, Validators,FormControl} from '@angular/forms';

import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserService } from '../../../Services/user.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {
  // call in the user.service.ts file on construction of this component
  constructor(public userService: UserService,  public route: ActivatedRoute, public router : Router) { }
  userForm: FormGroup;
  user: User;
  private mode = "create";
  private id: string;
  ngOnInit(){
    // create a form group with two required fields
    this.userForm = new FormGroup({
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
// Note: 'firstChild' is the key to getting the id parameter.
    // This is because the 'router-outlet' in 'app.component.html' does not look at child routes
    // router-outlet is at the top level in our app and can only look at params of top level routes.
    // Look how we have it set up in 'app-routing.module.ts'
    // Solving this issue was a real pain in the ass.....
    this.route.firstChild.paramMap.subscribe((paramMap: ParamMap) => {
      // if the url contains an id, we are editing
      if (paramMap.has("id")) {
        console.log(paramMap);
        // change mode to edit so that we can later determine what userService method to call
        this.mode = "edit";
        this.id = paramMap.get("id");
        // let's find our user of interest by id, so we can load it into the form
        this.userService.getUser(this.id).subscribe(userData => {
          this.user = {
            id:userData.id,
            firstName:userData.firstName,
            lastName: userData.lastName,
            email:userData.email,
            address:userData.address,
            password: userData.password
          };
          console.log(this.user);
          // load our user of interest into this components form
          this.userForm.setValue({
            id:userData.id,
            firstName: this.user.firstName,
            lastName:this.user.lastName,
            email:this.user.email,
            address:this.user.address,
            password: this.user.password,
          })
        });
        // if the url does not contain an id, we are creating
      } else {
        this.mode = "create";
        this.id = null;
      }
    });
  }

  onSubmit() {
    // logging the form on submission tells us how to get to the userId,password, firstName, lastName,address,email values
    console.log(this.userForm);
    // send the userId,password, firstName, lastName, address,email to our service, where we will eventually do an http post
    // if the mode is create, we want to create a user
    if (this.mode === "create") {
      this.userService.createUser(this.userForm.value.id,
                                  this.userForm.value.password,
                                  this.userForm.value.firstName,
                                  this.userForm.value.lastName,
                                  this.userForm.value.address,
                                  this.userForm.value.email
      );
      // if the mode is not create, we want to update the question
    } else {
        // call our updateQuestion method from the questionService
        this.userService.updateUser(
          this.id,
          this.userForm.value.password,
          this.userForm.value.firstName,
          this.userForm.value.lastName,
          this.userForm.value.address,
          this.userForm.value.email
        )
    }
    // after submitting, we want to display the list again and hide the create component
    this.userService.setDisplayListStatus(true);
    this.userService.setDisplayCreateStatus(false);
  }
}
