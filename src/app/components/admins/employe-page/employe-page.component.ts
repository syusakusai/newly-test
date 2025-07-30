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
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  pagedEmployees: Employee[] = [];
  filterText = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

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
    const text = this.filterText.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      (emp) =>
        emp.username.toLowerCase().includes(text) ||
        emp.firstName.toLowerCase().includes(text) ||
        emp.lastName.toLowerCase().includes(text) ||
        emp.email.toLowerCase().includes(text)
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
}
