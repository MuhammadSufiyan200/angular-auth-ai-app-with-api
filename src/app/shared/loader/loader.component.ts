import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule,AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loading$: Observable<boolean>;
  blocks = Array.from({ length: 9 }, (_, i) => i);

  constructor(public loaderService: LoaderService) {
    this.loading$ = this.loaderService.isLoading$;
  }
}
