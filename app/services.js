/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    'use strict';

    var myModule = angular.module('services', []).service('DataSource', function ($http) {
        var now = moment({year: 2012, month: 2});
        this.contact_me = function (contact) {

            var serialize = function (obj) {
                var str = [];
                for (var p in obj)
                    if (obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                return str.join("&");
            };
            var req = {
                method: 'POST',
                url: 'http://formspree.io/cooluhuru@gmail.com',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
                },
                data: serialize(contact)
            };

            return $http(req);
        };

        this.get_work_experience = function () {
            return [
                {
                    title: "Senior Business Analyst Programmer",
                    company_name: "Boomwork",
                    date_from: moment({year: 2005, month: 10}),
                    date_to: moment(),
                    location: {
                        country: "Australia",
                        town: "Sydney"
                    },
                    tags: ["ERA", "Prism", "MIS", "ORACLE"],
                    description: "BoomWorks needs an effective and a fast AngularJS coder to help meet a private client MVP deadline." +
                    "The product an industry game changer  - which is an AngularJS based CRM with a complex JAVA backend - and it must meet complex business logic with a high business value and a critical daily volume.",
                    website_url: null,
                    collapsed: false
                },
                {
                    title: "IT Consulant",
                    company_name: "shmik.com",
                    date_from: moment({year: 2004, month: 2}),
                    date_to: moment({year: 2005, month: 9}),
                    location: {
                        country: "Australia",
                        town: "Sydney"
                    },
                    tags: ["ReactJS", "FLUX", "Fluxible", "NodeJS", "JSX Harmony", "ES6/7"],
                    description: "Bauer Media needed the help of some extra contactors to help start & finish their new MVP website." +
                    "In this role, I help integrate Bauer innovative Fluxible based custom framework with a lot of ReactJS and continuous delivery workflow. " +
                    "I was part of a team of 5 and we all manage to finish the project in time.",
                    website_url: 'http://www.homestolove.com.au',
                    collapsed: false
                },
                {
                    title: "Web Application Developer",
                    company_name: "shmik.com",
                    date_from: moment({year: 2000, month: 2}),
                    date_to: moment({year: 2015, month: 2}),
                    location: {
                        country: "Australia",
                        town: "Sydney"
                    },
                    tags: ["AngularJS", "Foundation", "PHP5", "Zend1", "MySQL", "SLIM Framework", "Propel ORM", "LAMP stack"],
                    description: "<ul>" +
                            "<li>Online police checks planning, architecture & cutting edge implementation</li>" +
                            "<li>Custom CRM design, architecture & implementation</li>" +
                            "<li>WebServices development</li>" +
                            "<li>UX Design</li>" +
                            "<li>Analytics & SEO Consulting</li>" +
                            "</ul>",
                    website_url: 'http://www.veritascheck.com.au',
                    collapsed: false
                },
                {
                    title: "IT Manager",
                    date_from: moment({year: 2000, month: 6}),
                    date_to: moment({year: 2004, month: 5}),
                    company_name: "BetterCut Services Pty Ltd",
                    location: {
                        country: "Australia",
                        town: "Sydney"
                    },
                    description: "<ul><li>I designed and developed a JQuery based CRM with a web based mail client. Mails were retrieved via the IMAP protocol through a custom PHP socket class, and then stored into a MySQL database. They were linked to companies and contacts, then tagged with Leads / Follow Ups and any custom labels. Users were able to access multiple mailboxes at once. An administration interface allowed administrator to create virtual mailboxes, with read/reply permissions.</li>" +
                            "<li>Ten years of electronic correspondence have been imported from a domino legacy system to this new MySQL database</li>" +
                            "<li>I wrote the first version of webjobz.com, which was running on a Debian LAMP server (2GB ddr2 ram with an old CPU). The site was gettingthousands of unique visitors per day, and was generating dozens of different XML feeds. All was operating with minimal lag. Site uptime was > 99.99%</li>" +
                            "<li>SOAP and REST integration with different Job Feeds providers such as JobG8, MOnster, JObRapido and JobAdder</li>" +
                            "<li>I wrote a PHP framework from scratch to allow a unified  URLs rewritting accros a network of severall websites</li>" +
                            "<li>I designed the job board search & refine  backend and frontend</li>" +
                            "<li>System administrator: I maintained successfully a LAMP server stack across 3 dedicated machines. I implemented a MySQL replication backup strategy </li>" +
                            "</ul>",
                    tags: ["PHP5", "Yii", "Google Webmaster", "Google Analytics", "SOAP", "XML Feeds", "SEO", "DoubleClick", "Mysql", "SPHINX search", "JQuery", "IMAP protocol", "Domino"],
                    website_url: 'http://www.webjobz.com/jobs',
                    collapsed: false
                }
            ];
        };
        this.get_education = function () {
            return [
                {
                    title: "Polytech Geotechnic",
                    date_from: moment({year: 1998}),
                    date_to: moment({year: 2010}),
                    location: {
                        country: "France",
                        town: "Grenoble"
                    },
                    description: 'I studied Geotechnic at Polytech (formely known as ISTG) for two years before deciding to study information tehcnologies',
                    website_url: 'http://www.polytech-grenoble.fr/',
                    collapsed: false
                },
                {
                    title: "Bachelor in IT Science",
                    date_from: moment({year: 2010}),
                    date_to: moment({year: 2011}),
                    location: {
                        country: "France",
                        town: "Montpellier"
                    },
                    description: 'I have a solid formation on theorical and practical aspects in networking, databases, information systems, programming, image processing and artificial intelligence.',
                    website_url: 'http://en.wikipedia.org/wiki/Montpellier_2_University',
                    collapsed: false
                }
            ];
        };
        this.get_services = function () {
            return [
                {
                    title: "ERP/MIS Systems Development",
                    description: "You have an existing web application running AngularJs, EmberJs or written in any javascript web-application framework and you want to transform it into a phone or tablet native application." +
                            "Migration from an existing <b>web</b> application to an IOS, Android , Windows or Blackberry platform needs some optimization. <a ng-click='swipeLeft()'>Contact me</a>",
                    image: "img/blue-sphere.png"
                },
                {
                    title: "Business Process Improvement",
                    description: "Do you need to make your website responsive?" +
                            "A responsive design is a great cost saver. Most of the code doesn;t need any change, only the front-end css & html needs to be modified. The result will be a website that looks great on all platforms : TV, Desktop, Laptops, Tablets and phones. ",
                    image: "img/green-sphere.png"
                },
                {
                    title: "Web Architecture, Design, Development and Support",
                    description: "I offer 12 years experience in Web development. I am up to date with most cutting edge open source technologies and old school ones. " +
                            "It can be bug fixes, taking over someone else work, collaboration and team work, sprints and anything web related.",
                    image: "img/violet-sphere.png"
                },
                {
                    title: "Database Design, Maintenance, Migration, Performance Enhancements & Scalability",
                    description: "Are you looking to design a complexe web based application. Whatever SASS, Public internet or private  Intranet, it is crucial to take the correct decisions upfront. " +
                            "I have build from scratch many complex web-based system, and I am really passionate to discuss about challenging new concepts",
                    image: "img/dark-sphere.png"
                },
                {
                    title: "Cloud Services Design and Deployment",
                    description: "Database restoration, Maintenance, MIgration, Design, Replication. The only thing I don't know about is Database Scalability.",
                    image: "img/red-sphere.png"
                },
                {
                    title: "Specialty Custom Programming - From NPM Modules to VBA Macros",
                    description: "A crawler is a bot that automatically scrap web content following a strict specification." +
                            "A crawler can authenticate, save cookies & session, parse HTML and extract relevant informations." +
                            "Internet data is HUGE, a good massive crawler engine needs several dedicated servers.",
                    image: "img/orange-sphere.png"
                }
            ];
        };
        this.get_skills = function () {
            return {
                coding: [
                    {
                        logo: 'img/PHP_Logo.png',
                        bgColor: '#6082BB',
                        name: "PHP",
                        languages: [
                            {name: "PHP4&5", percentage: 4.5},
                            {name: "Zend1", percentage: 4},
                            {name: "Yii", percentage: 4.5},
                            {name: "Code Igniter", percentage: 3.5},
                            {name: "Cake PHP", percentage: 3.5}
                        ]
                    },
                    {
                        logo: 'img/ecma5_logo.png',
                        bgColor: '#fff',
                        name: "Javascript",
                        languages: [
                            {name: "Javascript", percentage: 4},
                            {name: "JQuery", percentage: 5},
                            {name: "AngularJS", percentage: 5},
                            {name: "ReactJS", percentage: 4.5},
                            {name: "Flux", percentage: 4.5},
                            {name: "ES6", percentage: 4},
                            {name: "JSX Harmony", percentage: 4.5},
                            {name: "Meteor", percentage: 3},
                            {name: "nodeJS", percentage: 4},
                            {name: "mean.js", percentage: 4.5},
                            {name: "Cordova", percentage: 4},
                            {name: "backbone", percentage: 1},
                            {name: "ember.js", percentage: 1}
                        ]
                    }, {
                        logo: 'img/perl_logo2.png',
                        bgColor: '#fff',
                        name: "Perl",
                        languages: [
                            {name: "Perl", percentage: 2.5}
                        ]
                    },
                    {
                        bgColor: '#fff',
                        name: "Design Techs",
                        languages: [
                            {name: "Css2/Css3", percentage: 4.5},
                            {name: "SASS/SCSS/Less", percentage: 4.5},
                            {name: "HTML", percentage: 5},
                            {name: "Foundation", percentage: 5},
                            {name: "Bootstrap", percentage: 5},
                            {name: "Foundation", percentage: 5}
                        ]
                    },
                    {
                        bgColor: '#fff',
                        name: "API Providers",
                        languages: [
                            {name: "OAUTH", percentage: 5},
                            {name: "REST", percentage: 5},
                            {name: "Google API", percentage: 4.5},
                            {name: "Facebook API", percentage: 4.5},
                            {name: "LinkedIn API", percentage: 4.5},
                            {name: "Twitter API", percentage: 4.5},
                            {name: "Other APIs", percentage: 4}
                        ]
                    },
                    {
                        logo: 'img/java-oracle.png',
                        bgColor: '#fff',
                        name: "JAVA",
                        languages: [
                            {name: "JAVA", percentage: 4},
                            {name: "GWT", percentage: 3},
                            {name: "Spring MVC", percentage: 2.5},
                            {name: "Others", percentage: 0.5}
                        ]
                    },
                    {
                        logo: 'img/mslogo.png',
                        bgColor: '#fff',
                        name: "Microsoft",
                        languages: [
                            {name: "C#", percentage: 3},
                            {name: "ASP", percentage: 2.5},
                            {name: "Others", percentage: 0.5}
                        ]
                    }],
                server: [
                    {
                        logo: '',
                        name: "Linux",
                        bgColor: '#fff',
                        languages: [
                            {name: "Debian", percentage: 4.5},
                            {name: "RedHat", percentage: 3},
                            {name: "Centos", percentage: 2},
                            {name: "Ubuntu", percentage: 2.5}
                        ]
                    },
                    {
                        logo: '',
                        name: "Databases",
                        bgColor: '#fff',
                        languages: [
                            {name: "MySQL", percentage: 4},
                            {name: "MongoDB", percentage: 3.5},
                            {name: "PostgreSQL", percentage: 2},
                            {name: "SQL Server", percentage: 0},
                            {name: "Oracle", percentage: 0},
                            {name: "Access", percentage: 0},
                            {name: "Firebase", percentage: 0}
                        ]
                    }, {
                        logo: '',
                        name: "Web Servers",
                        bgColor: '#fff',
                        languages: [
                            {name: "Apache2", percentage: 4.5},
                            {name: "NGinX", percentage: 4},
                            {name: "Express", percentage: 4},
                            {name: "IIS", percentage: 0},
                            {name: "WebRick", percentage: 4},
                            {name: "Node", percentage: 4}
                        ]
                    }
                ],
                softwares: [
                    {
                        logo: '',
                        name: "Google",
                        bgColor: '#fff',
                        languages: [
                            {name: "Webmaster", percentage: 4.5},
                            {name: "Analytics", percentage: 4.5},
                            {name: "Adwords", percentage: 3},
                            {name: "Double Click", percentage: 4.5}
                        ]
                    },
                    {
                        logo: '',
                        name: "Graphic editors",
                        bgColor: '#fff',
                        languages: [
                            {name: "Gimp", percentage: 3},
                            {name: "Photoshop", percentage: 2.5},
                            {name: "Illustrator", percentage: 2.5},
                            {name: "Premiere", percentage: 2.5},
                            {name: "After Effects", percentage: 2.5},
                            {name: "Flash", percentage: 2.5}
                        ]
                    },
                    {
                        logo: '',
                        name: "Code Editors",
                        languages: [
                            {name: "Netbeans", percentage: 4.5},
                            {name: "WebStorm", percentage: 4},
                            {name: "Brackets", percentage: 4},
                            {name: "Sublime", percentage: 3},
                            {name: "Vi", percentage: 1},
                            {name: "NotePad++", percentage: 1},
                            {name: "Aptana studio", percentage: 1}
                        ]
                    }
                ]

            };
        };

        this.get_interests = function () {
            return ["Photography", "Travelling", "Music", "Technology"];
        };

        this.get_technology_used = function(){
            return [
                {
                    name: "AngularJS",
                    version: "1.3.*",
                    url: "https://angularjs.org/",
                    licence: "MIT licence",
                    comment: "This awesome dual-binding javascript framework made by geniuses @ Google"
                },
                {
                    name: "Material Design",
                    version: "0.8.3",
                    url: "https://github.com/angular/material/",
                    licence: "No licence",
                    comment: "This revolutionary and complete guide to modern mobile design made by Google - Port to AngularJS in progress"
                },
                {
                    name: "Node.JS",
                    version: "0.12.1",
                    url: "https://nodejs.org/",
                    licence: "Multiple Licence",
                    comment: "The most performant server side technology untill now"
                },
                {
                    name: "Bower",
                    version: "1.3.12",
                    url: "http://bower.io/",
                    licence: "No licence",
                    comment: "A package manager for client side javascript files"
                },
                {
                    name: "Grunt",
                    version: "0.4.5",
                    url: "http://gruntjs.com/",
                    licence: "No Licence",
                    comment: "A Task manager used with uglify, annotate, concat, jslint & csslint, angular template caching and html minification"
                },
                {
                    name: "Flippy",
                    version: "0",
                    url: "MIT Licence",
                    licence: " https://github.com/zwacky/angular-flippy",
                    comment: "An AngularJS Flippy directive."
                },
                {
                    name: "Font Awesome",
                    version: "4.3.0",
                    url: "MIT Licence, OFL-1.1, CC-BY-3.0",
                    licence: " https://github.com/zwacky/angular-flippy",
                    comment: "A large collection of icons embeded in a font"
                },
                {
                    name: "TagCanvas",
                    version: "2.2.0",
                    url: "http://www.goat1000.com/tagcanvas.php",
                    licence: "LGPL v3",
                    comment: "TagCanvas is a Javascript class which will draw and animate a HTML5  canvas based tag cloud"
                },
                {
                    name: "MomentJS",
                    version: "2.9.0",
                    url: "http://momentjs.com/",
                    licence: "MIT Licence",
                    comment: "Parse, validate, manipulate, and display dates in JavaScript."
                }
            ];
        };
    });
})();