package net.javatask.banking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class AccountDto {
    private Long id;
    private String accountHolderName;
    private double balance;
    private LocalDate dob;
    private String email;
    private String phoneNumber;
}
