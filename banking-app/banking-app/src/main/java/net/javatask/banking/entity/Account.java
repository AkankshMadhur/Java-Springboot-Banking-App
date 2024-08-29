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
@Table(name="accounts")
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_holder_name")
    private String accountHolderName;
    private double balance;

    @Column(name = "dob") // Date of Birth column
    private LocalDate dob;

    @Column(name = "email") // Email column
    private String email;

    @Column(name = "phone_number") // Phone number column
    private String phoneNumber;


}
