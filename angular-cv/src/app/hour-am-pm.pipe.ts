import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourAmPm',
  standalone: true
})
export class HourAmPmPipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') return '';

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';

    let hours = date.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${hours}${ampm}`;
  }
}


