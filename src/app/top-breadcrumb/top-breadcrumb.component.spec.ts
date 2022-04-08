import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBreadcrumbComponent } from './top-breadcrumb.component';

describe('TopBreadcrumbComponent', () => {
  let component: TopBreadcrumbComponent;
  let fixture: ComponentFixture<TopBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
