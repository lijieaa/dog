package com.visizen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.context.support.ResourceBundleThemeSource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.theme.SessionThemeResolver;

/**
 * Created by jay on 2017/10/12.
 */
@Controller
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }

    /**
     * 设置主题存放目录
     * @return
     */
    @Bean
    public ResourceBundleThemeSource themeSource() {
        ResourceBundleThemeSource themeSource = new ResourceBundleThemeSource();
        themeSource.setBasenamePrefix("theme.");
        return themeSource;
    }


    /**
     * 设置主题解析器为SessionThemeResolver，默认为主题为adminlte
     * @return
     */
    @Bean(name = "themeResolver")
    public SessionThemeResolver sessionThemeResolver() {
        SessionThemeResolver sessionThemeResolver = new SessionThemeResolver();
        sessionThemeResolver.setDefaultThemeName("adminlte");
        return sessionThemeResolver;
    }

    /**
     * 配置国际化资源路径
     * @return
     */
    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("local/message");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
