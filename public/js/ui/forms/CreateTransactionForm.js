/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const list = this.element.querySelector('.accounts-select');
    list.querySelectorAll('option').forEach(e => e.remove());

    Account.list(null, (err, resp) => {
      if (resp && resp.success) {
        resp.data.forEach(i => list.insertAdjacentHTML(
          'beforeend',
          `<option value="${i.id}">${i.name}</option>`
        ));
      }
    });
  }

  /** 
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if (resp && resp.success) {
        this.element.reset();
        App.update();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      }
    });
  }
}