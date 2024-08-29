package net.javatask.banking.mapper;

import net.javatask.banking.dto.AccountDto;
import net.javatask.banking.entity.Account;

public class AccountMapper {
    public static Account mapToAccount(AccountDto accountDto){
        Account account = new Account();
        account.setId(accountDto.getId());
        account.setAccountHolderName(accountDto.getAccountHolderName());
        account.setBalance(accountDto.getBalance());
        account.setDob(accountDto.getDob());
        account.setEmail(accountDto.getEmail());
        account.setPhoneNumber(accountDto.getPhoneNumber());
        return account;
    }

    public static AccountDto mapToAccountDto(Account account){
        AccountDto accountDto = new AccountDto(
                account.getId(),
                account.getAccountHolderName(),
                account.getBalance(),
                account.getDob(),
                account.getEmail(),
                account.getPhoneNumber()
        );
        return accountDto;
    }
}
