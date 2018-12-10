import { Payment } from "../models/payment";

export function getPayments(participants) {
  let payments = [];
  const map = getExpensesMap(participants);

  const expensesSum = getExpensesSum(participants);
  const sumPerParticipant = expensesSum / participants.length;
  while (!areExpensesEqual(map)) {
    const { highest, lowest } = getParticipantsForTransaction(map);
    const transactionValue = sumPerParticipant - lowest.expenses;
    payments.push({
      from: lowest.id,
      to: highest.id,
      value: transactionValue
    });
    map[highest.id].expenses = map[highest.id].expenses - transactionValue;
    map[lowest.id].expenses = map[lowest.id].expenses + transactionValue;
  }
  return flattenTransactionsToPayments(payments, participants);
}

function getExpensesMap(participants) {
  let expensesDebtMap = {};
  for (let participant of participants) {
    let participantExpenses = participant.getExpensesValueSum();
    expensesDebtMap[participant.id] = {
      expenses: participantExpenses
    };
  }

  return expensesDebtMap;
}

function getExpensesSum(participants) {
  let expensesSum = 0;
  for (let participant of participants) {
    let participantExpenses = participant.getExpensesValueSum();
    expensesSum += participantExpenses;
  }

  return expensesSum;
}

function flattenTransactionsToPayments(transactions, participants) {
  const paymentsMap = new Map([]);
  for (let { from, to, value } of transactions) {
    let key = `${from},${to}`;
    if (paymentsMap.has(key)) {
      paymentsMap.set(key, paymentsMap.get(key) + value);
    } else {
      paymentsMap.set(key, value);
    }
  }

  let payments = [];
  for ([key, value] of paymentsMap.entries()) {
    let [from, to] = key.split(",");
    const payer = findParticipantById(participants, from);
    const payee = findParticipantById(participants, to);
    const payment = new Payment(payer, payee, value);
    payments.push(payment);
  }
  return payments;
}

function findParticipantById(participants, id) {
  return participants.find(participant => participant.id === id);
}

function getParticipantsForTransaction(map) {
  let highest, lowest;
  for (let participantId of Object.keys(map)) {
    let entry = map[participantId];
    if (!lowest || lowest.expenses > entry.expenses) {
      lowest = {
        id: participantId,
        expenses: entry.expenses
      };
    }
    if (!highest || highest.expenses < entry.expenses) {
      highest = {
        id: participantId,
        expenses: entry.expenses
      };
    }
  }
  return { highest, lowest };
}
function areExpensesEqual(map) {
  let set = new Set([]);
  for (let participantId of Object.keys(map)) {
    set.add(Math.floor(map[participantId].expenses));
  }
  return set.size < 2;
}
