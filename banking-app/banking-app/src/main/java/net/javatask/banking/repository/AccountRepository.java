package net.javatask.banking.repository;

import net.javatask.banking.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository <Account,Long> {
}
