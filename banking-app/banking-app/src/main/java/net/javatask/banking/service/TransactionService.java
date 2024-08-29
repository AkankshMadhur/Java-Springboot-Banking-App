package net.javatask.banking.service;

import net.javatask.banking.entity.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction recordTransaction(Long accountId, String transactionType, double amount);
    List<Transaction> getTransactionHistory(Long accountId);
    List<Transaction> getAllTransactions();
    Transaction recordTransaction(Transaction transaction);
}
