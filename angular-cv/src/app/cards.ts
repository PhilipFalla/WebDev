import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DeckInfo {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export interface Card {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
  value: string;
  suit: string;
}

export interface DrawnCard {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private shuffleURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

  constructor(private http: HttpClient) {}

  getDeck(): Observable<DeckInfo> {
    return this.http.get<DeckInfo>(this.shuffleURL);
  }

  drawCard(deck_id: string): Observable<DrawnCard> {
    const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
    return this.http.get<DrawnCard>(url);
  }
}
