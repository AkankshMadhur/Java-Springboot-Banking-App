package net.javatask.banking.service.impl;

import net.javatask.banking.entity.Transaction;
import net.javatask.banking.repository.TransactionRepository;
import net.javatask.banking.service.TransactionService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    public Transaction recordTransaction(Long accountId, String transactionType, double amount) {
        Transaction transaction = new Transaction();
        transaction.setAccountId(accountId);
        transaction.setTransactionType(transactionType);
        transaction.setAmount(amount);
        transaction.setTransactionDate(LocalDate.now());

        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionHistory(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction recordTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
