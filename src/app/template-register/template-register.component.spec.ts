import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRegisterComponent } from './template-register.component';

describe('TemplateRegisterComponent', () => {
  let component: TemplateRegisterComponent;
  let fixture: ComponentFixture<TemplateRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
