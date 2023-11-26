package hu.szoftmern.project;

import hu.szoftmern.project.testDatabase.TestDatabase;
import hu.szoftmern.project.testEmail.TestEmail;
import hu.szoftmern.project.testModel.TestDriver;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ProjectApplicationTests {
    @Test
    void contextLoads() {
        TestDatabase testDatabase = new TestDatabase();
        testDatabase.testUserEntityPersistence();

        TestEmail testEmail = new TestEmail();
        testEmail.testWeeklySendEmail();
    }
}
