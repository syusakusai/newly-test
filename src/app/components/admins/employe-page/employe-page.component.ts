import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Employee } from '../../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-employe-page',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './employe-page.component.html',
  styleUrl: './employe-page.component.css',
})
export class EmployePageComponent {
  showAddModal = false;

  newEmployee: Employee = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: '',
  };
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pagedEmployees: Employee[] = [];
  filterUsername: string = '';
  filterFirstName: string = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  deleteMessage: string = '';
  showDetailModal = false;
  selectedEmployee: Employee | null = null;

  constructor(private http: HttpClient) {
    this.http
      .get<{ employee: Employee[] }>('assets/data/employee_dummy_data.json')
      .subscribe((data) => {
        this.employees = data.employee;
        this.filteredEmployees = [...this.employees];
        this.totalPages = Math.ceil(
          this.filteredEmployees.length / this.pageSize
        );
        this.setPage(1);
      });
  }

  applyFilter() {
    const username = this.filterUsername.toLowerCase();
    const firstName = this.filterFirstName.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (emp) =>
        emp.username.toLowerCase().includes(username) &&
        emp.firstName.toLowerCase().includes(firstName)
    );
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    this.setPage(1);
  }

  setPage(page: number) {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedEmployees = this.filteredEmployees.slice(start, end);
  }

  onPageSizeChange() {
    this.pageSize = Number(this.pageSize);
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    this.setPage(1);
  }

  addEmployee() {
    if (
      this.newEmployee.username &&
      this.newEmployee.firstName &&
      this.newEmployee.lastName &&
      this.newEmployee.email &&
      this.newEmployee.birthDate &&
      this.newEmployee.basicSalary &&
      this.newEmployee.status &&
      this.newEmployee.group
    ) {
      this.employees.push({ ...this.newEmployee });
      this.applyFilter();
      this.newEmployee = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        basicSalary: 0,
        status: '',
        group: '',
        description: '',
      };
      this.showAddModal = false;
    }
  }
  deleteEmployee(emp: Employee) {
    this.employees = this.employees.filter((e) => e !== emp);
    this.applyFilter();
    this.deleteMessage = 'Delete is successful';
    setTimeout(() => {
      this.deleteMessage = '';
    }, 2000); // Hide after 2 seconds
  }

  openDetailModal(emp: Employee) {
    this.selectedEmployee = emp;
    this.showDetailModal = true;
  }
}
