import { Component, ElementRef, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('toggleContact') toggleContactBtn!: ElementRef;
  @ViewChild('contactInfo') contactInfoDiv!: ElementRef;
  @ViewChild('download') downloadBtn!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.listen(this.toggleContactBtn.nativeElement, 'click', () => {
      const contactInfoEl = this.contactInfoDiv.nativeElement;
      if (contactInfoEl.style.display === 'none') {
        this.renderer.setStyle(contactInfoEl, 'display', 'block');
        this.toggleContactBtn.nativeElement.textContent = 'Hide Contact Info';
      } else {
        this.renderer.setStyle(contactInfoEl, 'display', 'none');
        this.toggleContactBtn.nativeElement.textContent = 'Show Contact Info';
      }
    });

    this.renderer.listen(this.downloadBtn.nativeElement, 'click', () => {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      doc.html(document.body, {
        callback: function (pdf) {
          pdf.save('My-CV.pdf');
        },
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.6
        }
      });
    });
  }
}
