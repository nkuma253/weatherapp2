import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  customerList: any;

  constructor(private firebase: AngularFireDatabase, private http: HttpClient) { }
  empList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    // location: new FormControl(''),
    salary: new FormControl('', Validators.required),
    // image: new FormControl('')
  });
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      salary: ''
    });
  }
  getEmployee() {
    this.empList = this.firebase.list('employee');
    return this.empList.snapshotChanges();
  }

  insertEmployee(empplyee) {
    this.empList.push({
      fullName: empplyee.fullName,
      email: empplyee.email,
      mobile: empplyee.mobile,
      // location: empplyee.location,
      salary: empplyee.salary,
      // image: empplyee.image
    });
  }
  populateForm(employee) {
    this.form.setValue(employee);
  }
  updateEmployee(employee) {
    this.empList.update(employee.$key,
      {
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        // location: employee.location,
        salary: employee.salary
      });
  }
  deleteEpmloyee($key: string) {
    this.empList.remove($key);
  }
  getWeather(location) {
    return this.http.get(
        'https://api.apixu.com/v1/current.json?key=fbe18a783e754597af6114134192308&q=' + location
    );
}
}
