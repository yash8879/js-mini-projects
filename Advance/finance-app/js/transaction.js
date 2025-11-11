export class Transaction {
  constructor(title, amount, type, date) {
    this.id = Date.now();
    this.title = title;
    this.amount = parseFloat(amount);
    this.type = type;
    this.date = date;
  }
}
