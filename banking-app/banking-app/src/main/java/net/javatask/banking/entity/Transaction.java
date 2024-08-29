package net.javatask.banking.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name="transaction_id")
    private Long id;

    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "transaction_type")
    private String transactionType;

    private double amount;

    @Column(name = "transaction_date")
    private LocalDate transactionDate;

}
