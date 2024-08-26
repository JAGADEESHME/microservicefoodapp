import { Component } from '@angular/core';

@Component({
  selector: 'app-test', // This should match the tag used in app.component.html
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  testData: string = 'Hello from Test Component!';
}