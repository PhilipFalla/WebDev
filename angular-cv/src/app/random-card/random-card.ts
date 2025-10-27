import { Component } from '@angular/core';
import { CardsService, Card } from '../cards';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-random-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './random-card.html',
  styleUrls: ['./random-card.css']
})
export class RandomCard {
  deckId = '';
  currentCard: Card | null = null;

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    this.cardsService.getDeck().subscribe(deck => {
      this.deckId = deck.deck_id;
    });
  }

  draw() {
    if (!this.deckId) return;

    this.cardsService.drawCard(this.deckId).subscribe(result => {
      this.currentCard = result.cards[0];
    });
  }
}
