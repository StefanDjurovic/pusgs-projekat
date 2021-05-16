import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() pagesToShow: number;
  @Input() loading: boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() updateSize = new EventEmitter<number>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  setPageSizeOptions(e) {
    this.perPage = this.pageSize;
    this.updatePageSize(this.perPage);
  }

  updatePageSize(n): void {
    this.updateSize.emit(n);
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(): void {
    this.goNext.emit(true);
  }

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  isLastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }

  getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  getMax(): number {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.count / this.perPage);
    const thisPage = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(thisPage);

    for (let i = 0; i < pagesToShow - 1; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }

      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < totalPages) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }

      pages.sort((a, b) => a - b);
      return pages;
    }
  }


}
