package net.javatask.banking.service.impl;

import net.javatask.banking.dto.AccountDto;
import net.javatask.banking.entity.Account;
import net.javatask.banking.exception.AccountNotFoundException;
import net.javatask.banking.exception.InsufficientBalanceException;
import net.javatask.banking.mapper.AccountMapper;
import net.javatask.banking.repository.AccountRepository;
import net.javatask.banking.service.AccountService;
import net.javatask.banking.service.TransactionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final TransactionService transactionService;

    public AccountServiceImpl(AccountRepository accountRepository, TransactionService transactionService) {
        this.accountRepository = accountRepository;
        this.transactionService = transactionService;
    }


    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.mapToAccount(accountDto);
        account.setAccountHolderName(accountDto.getAccountHolderName());
        account.setPhoneNumber(accountDto.getPhoneNumber());
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(savedAccount);
    }


    @Override
    public AccountDto getAccountByID(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exist"));
        return AccountMapper.mapToAccountDto(account);
    }

    @Override
    public AccountDto deposit(Long id, double amount) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
        double total = account.getBalance() + amount;
        account.setBalance(total);
        Account savedAccount = accountRepository.save(account);


        // Record deposit transaction
        transactionService.recordTransaction(id, "deposit", amount);

        return AccountMapper.mapToAccountDto(savedAccount);

    }


    @Override
    public AccountDto withdraw(Long id, double amount) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));

        if (account.getBalance() < amount) {
            throw new InsufficientBalanceException("Insufficient balance for withdrawal");
        }

        double total = account.getBalance() - amount;
        account.setBalance(total);
        Account savedAccount = accountRepository.save(account);

        // Record withdrawal transaction
        transactionService.recordTransaction(id, "withdrawal", amount);

        return AccountMapper.mapToAccountDto(savedAccount);
    }



    @Override
    public List<AccountDto> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream()
                .map(AccountMapper::mapToAccountDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAccount(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account does not exist"));
        accountRepository.deleteById(id);
    }
}
