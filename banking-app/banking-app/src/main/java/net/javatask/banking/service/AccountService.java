package net.javatask.banking.service;

import net.javatask.banking.dto.AccountDto;

import java.util.List;

public interface AccountService {
//    Account createAccount(Account account);

    AccountDto createAccount(AccountDto accountDto);

    AccountDto getAccountByID(Long id);


    AccountDto deposit(Long id,double amount);

    AccountDto withdraw(Long id,double amount);

    List<AccountDto>getAllAccounts();

    void deleteAccount(Long id);
}
