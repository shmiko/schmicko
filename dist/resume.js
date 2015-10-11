(function () {
    'use strict';
    angular.module('angularSlideables', [])
            .directive('slideable', function () {
                return {
                    restrict: 'C',
                    compile: function (element, attr) {
                        // wrap tag
                        var contents = element.html();
                        element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

                        return function postLink(scope, element, attrs) {
                            // default properties
                            attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                            attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                            element.css({
                                'overflow': 'hidden',
                                'height': '0px',
                                'transitionProperty': 'height',
                                'transitionDuration': attrs.duration,
                                'transitionTimingFunction': attrs.easing
                            });
                        };
                    }
                };
            })
            .directive('slideToggle', function () {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        var target, content;

                        attrs.expanded = false;
                        if (!Date.now) {
                            Date.now = function () {
                                return new Date().getTime();
                            };
                        }
                        attrs.previousClick = null;
                        attrs.lastClickTimestamp = Date.now();

                        element.bind('mouseup', function () {
                            /**
                             * 
                             * @type @exp;Date@call;now
                             * Fix this annoying bug where ng-click triggers a double click on mobile, despite having ng-touch
                             */
                            var timeStampClick = Date.now();
                            if (attrs.previousClick === null) {
                                attrs.previousClick = attrs.lastClickTimestamp;
                            }
                            else if ((timeStampClick - attrs.previousClick) > 1000) {
                                console.log("more than 1000ms, this is not a double click");
                                attrs.lastClickTimestamp = Date.now();
                                attrs.previousClick = attrs.lastClickTimestamp;
                            }
                            else {
                                console.log("This is a double click. ignoring");
                                return;
                            }
                            console.log("click slidetoggle");

                            if (!target)
                                target = document.querySelector(attrs.slideToggle);
                            if (!content)
                                content = target.querySelector('.slideable_content');

                            if (!attrs.expanded) {
                                content.style.border = '1px solid rgba(0,0,0,0)';
                                var y = content.clientHeight;
                                console.log(content.clientHeight);
                                content.style.border = 0;
                                target.style.height = y + 'px';
                            } else {
                                target.style.height = '0px';
                            }
                            attrs.expanded = !attrs.expanded;
                        });
                    }
                };
            });
})();;(function () {
    'use strict';
    angular.module('unsafeHtml', []).filter('unsafe', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    });
})();
;(function () {
    'use strict';
    angular.module('angularScrollParralax', [])
            .directive('scroll', function ($window, $timeout) {
                return{
                    restrict: 'A',
                    scope: {
                        scrollaction: '='
                    },
                    link: function ($scope, element, attrs) {

                        var scrollAction = $scope.scrollaction;

                        console.log(element);

                        angular.element($window).bind("scroll", function () {


                            for (var i in scrollAction) {
                                var elem = angular.element(document.getElementById(i));
                                if (this.pageYOffset > elem[0].offsetTop && this.pageYOffset < (elem[0].offsetTop + elem[0].offsetHeight)) {

                                    angular.element(document.getElementById(scrollAction[i])).css("background-color", "#EBEBEB");

                                }
                                else {

                                    angular.element(document.getElementById(scrollAction[i])).css("background-color", "transparent");

                                }

                            }
                        });


                    }
                };
            });
})();

;(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('resume', [
        'ngRoute',
        'pro',
        'education',
        'portfolio',
        'service',
        'skills',
        'contact',
        'technologies',
        'menu',
        'ngMaterial',
        'ngAnimate',
        'angularSlideables',
        'unsafeHtml',
        'ngSlider',
        'angular-flippy',
        'duScroll',
        'angularScrollParralax',
        'ngTouch',
        'templates-main'
    ])
            .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider.when('/resume', {
                        templateUrl: 'views/menu.html',
                        controller: 'AppCtrl'
                    }).otherwise({redirectTo: '/resume'});
                }])
            .controller("AppCtrl", function ($scope, $mdMedia, $timeout, $document, $window, $mdSidenav, $parse, $log) {
                $scope.customQuery = $mdMedia('(min-width: 500px)');
                $scope.anotherCustom = $mdMedia('max-width: 400px');


                if ("ontouchstart" in window || navigator.msMaxTouchPoints)
                {
                    $scope.isTouch = true;
                    $scope.flex_small_content = 100;
                } else {
                    $scope.isTouch = false;
                    $scope.flex_small_content = 85;
                }

                function animateSwipe() {
                    if ($scope.isTouch) {
                        $scope.showSlide = true;
                        $scope.showFace = false;
                        $timeout(function () {
                            $scope.showSlide = false;
                            $scope.showFace = true;
                        }, 3000);
                    }
                    else {
                        $scope.showSlide = false;
                        $scope.showFace = true;
                    }

                }
                animateSwipe();


                function checkSideBarsDimension() {
                    if ($mdMedia('max-width: 400px')) {

                        angular.element(document.getElementById('smallLeft'))
                                .removeClass('small-sidenav')
                                .removeClass('smaill-sidenav');

                        angular.element(document.getElementById('right'))
                                .removeClass('large-contact-sidenav')
                                .removeClass('medium-contact-sidenav')
                                .removeClass('small-contact-sidenav')
                                .addClass('small-contact-sidenav');
                    }
                    else if ($mdMedia('max-width: 500px')) {

                        angular.element(document.getElementById('smallLeft')).removeClass('small-sidenav');
                        angular.element(document.getElementById('right'))
                                .removeClass('large-contact-sidenav')
                                .removeClass('medium-contact-sidenav')
                                .removeClass('small-contact-sidenav')
                                .addClass('medium-contact-sidenav');
                    }
                    else if ($mdMedia('max-width: 600')) {

                        angular.element(document.getElementById('right'))
                                .removeClass('large-contact-sidenav')
                                .removeClass('medium-contact-sidenav')
                                .removeClass('small-contact-sidenav')
                                .addClass('medium-contact-sidenav');
                    }
                    else {

                        angular.element(document.getElementById('right'))
                                .removeClass('large-contact-sidenav')
                                .removeClass('medium-contact-sidenav')
                                .removeClass('small-contact-sidenav')
                                .addClass('large-contact-sidenav');
                    }
                }

                angular.element($window).bind('orientationchange', function () {
                    checkSideBarsDimension();
                });
                angular.element($window).bind('resize', function () {
                    checkSideBarsDimension();
                });
                checkSideBarsDimension();


                $scope.swipeRight = function () {
                    if ($mdMedia('max-width: 600px') === true) {
                        console.log("max-width2 : 500");
                        $mdSidenav('smallLeft').toggle();
                    }
                    else {
                        console.log("max-width2 > 600");
                        $mdSidenav('largeLeft').toggle();
                    }

                    $mdSidenav('right').close();
                };

                $scope.swipeLeft = function () {
                    $mdSidenav('largeLeft').close();
                    $mdSidenav('smallLeft').close();
                    $mdSidenav('right').toggle();
                };

                $scope.goToAnchor = function (id) {

                    var someElement = angular.element(document.getElementById(id));

                    $mdSidenav('largeLeft').close();
                    $mdSidenav('smallLeft').close();
                    $document.scrollToElement(someElement, -10, 1000).then(function () {
                        /*var scrollaction =  $document.find("[scrollaction]")[0].attributes.scrollaction.value;
                         scrollaction = $parse(scrollaction)($scope);                    
                         angular.element("#" + scrollaction[id]).css("background-color", "#EBEBEB");*/

                    });


                };

                $scope.toggleLeft = function () {
                    $mdSidenav('smallLeft').toggle()
                            .then(function () {
                                $log.debug("toggle left is done");
                            });
                };
                $scope.toggleLeft2 = function () {
                    $mdSidenav('largeLeft').toggle()
                            .then(function () {
                                $log.debug("toggle left2 is done");
                            });
                };


            })
            .run(function ($http, $templateCache) {
                var templates = ['views/skype.html', 'views/hangout.html'];

                angular.forEach(templates, function (templateUrl) {
                    $http({method: 'GET', url: templateUrl}).success(function (data) {
                        $templateCache.put(templateUrl, data);
                    });
                });
            });

})();;/* 
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
})();;(function () {
    'use strict';

    angular.module('education', ['services'])
            .controller('EducationCtrl', function ($scope, DataSource) {

                $scope.education = DataSource.get_education();

            });
})();;(function () {
    'use strict';
    angular.module('portfolio', ['services'])
            .controller('PortfolioCtrl', function ($scope, DataSource) {

                $scope.portfolio = DataSource.get_education();

            });
})();;(function () {
    'use strict';
    angular.module('pro', ['services'])
            .controller('ProCtrl', function ($scope, DataSource) {

                $scope.experience = DataSource.get_work_experience();
                $scope.skills = DataSource.get_skills();

            });
})();;(function () {
    'use strict';
    angular.module('service', ['services'])
            .controller('ServiceCtrl', function ($scope, $timeout, DataSource) {

                $scope.services = DataSource.get_services();
                $scope.skills = DataSource.get_skills();

                $scope.options = {
                    from: 1,
                    to: 5,
                    step: 0.5,
                    scale: [0, '|', 1, '|', 2, '|', 3, '|', 4, '|', 5]
                };

                $timeout(function () {

                    TagCanvas.Start('myCanvas', 'tags', {
                        reverse: false,
                        depth: 0.99,
                        initial: [0.1, 0],
                        noMouse: true,
                        radiusX: 0.6,
                        radiusY: 0.6,
                        textColour: '#ffffff',
                        //shape: 'hring',
                        shadowBlur: 4,
                        shadow: '#000000',
                        shadowOffset: [2, 2]
                    }, 2000);

                },5000);

            });
})();;(function () {
    'use strict';
    angular.module('skills', ['services'])
            .controller('SkillsCtrl', function ($scope, DataSource) {

                $scope.skills = DataSource.get_skills();

            });

})();
        ;(function () {
    'use strict';
    angular.module('contact', ['services', 'ngMaterial', 'ngMessages'])
        .controller('ContactCtrl', function ($scope, DataSource) {
            $scope.data = {
                selectedIndex: 0,
                secondLocked: true,
                secondLabel: "Item Two"
            };
            $scope.next = function () {
                $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
            };
            $scope.previous = function () {
                $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
            };


        })
        .controller('FormCtrl', function ($scope, DataSource) {
            $scope.user = {
                name: '',
                _replyto: '',
                message: ''
            };
            $scope.mailSent = false;
            $scope.sendMail = function (form) {
                console.log(form);
                if (form.$valid) {
                    $scope.mailSent = true;
                    DataSource.contact_me($scope.user).success(function () {
                        console.log("success");
                    }).error(function (a, b, c, d) {
                        console.log('error');
                        console.log(a);
                        console.log(b);
                        console.log(c);
                        console.log(d);
                    });
                }

            };
        })
        .controller('SkypeCtrl', function ($scope, $timeout) {
            $timeout(function () {

                Skype.ui({
                    name: "dropdown", "element": "SkypeButton_Call_montpellier_1001net",
                    "participants": ["montpellier_1001net"],
                    "imageSize": 32
                });

            });
        })
        .controller('HangoutCtrl', function ($scope, $timeout) {
            $scope.user = {
                phone: '+61 424207292'
            };
            $timeout(function () {
                var t = gapi.hangout.render('placeholder-div', {
                    render: 'createhangout',
                    hangout_type: "normal",
                    invites: [
                        //{invite_type: 'email', id: 'antoine.lucas.australia@gmail.com'},
                        {invite_type: 'phone', id: $scope.user.phone}
                        //{invite_type: 'email', id: 'cooluhuru@gmail.com'}
                    ],
                    topic: "Interview1"

                });
                console.log(t);

            });


        });
})();
/*
 .config(function ($mdThemingProvider) {
 // Configure a dark theme with primary foreground yellow
 $mdThemingProvider.theme('default')
 .primaryPalette('blue-grey')
 .accentPalette('orange')
 .warnPalette('brown');
 })*/


;(function () {
    'use strict';

    angular.module('menu', [])
            .controller('MenuCtrl', function ($scope, $window) {

                $scope.showPortrait = false;

                angular.element($window).bind("scroll", function () {


                    var elem = angular.element(document.getElementById("intro-name"));
                    if (this.pageYOffset < (elem[0].offsetTop + elem[0].offsetHeight)) {
                        $scope.showPortrait = false;
                    }
                    else {
                        $scope.showPortrait = true;

                    }
                    $scope.$apply();
                    console.log("showPortrait = " + $scope.showPortrait);

                });



            });
})();






       ;(function () {
    'use strict';
    angular.module('technologies', ['services'])
            .controller('TechnologiesCtrl', function ($scope, DataSource) {

                $scope.technologies = DataSource.get_technology_used();

            });
})();;angular.module('templates-main', ['views/contact.min.html', 'views/education.min.html', 'views/form.min.html', 'views/hangout.min.html', 'views/intro.min.html', 'views/menu-content-header.min.html', 'views/menu-content1.min.html', 'views/menu-content2.min.html', 'views/menu.min.html', 'views/portfolio.min.html', 'views/professional.min.html', 'views/services.min.html', 'views/skype.min.html', 'views/skills.html']);

angular.module("views/contact.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/contact.min.html",
    "<div class=\"tabsdemoStaticTabs sample\"><md-tabs class=\"md-accent\" md-selected=\"data.selectedIndex\"><md-tab id=\"tab1\" aria-controls=\"tab1-content\"><img src=\"img/form-ico.png\" hide-gt-md> <span hide show-gt-md>Contact Form</span></md-tab><md-tab id=\"tab2\" aria-controls=\"tab2-content\"><img src=\"img/hangout.png\" hide-gt-md> <span hide show-gt-md>Hangout</span></md-tab><md-tab id=\"tab3\" aria-controls=\"tab3-content\"><img src=\"img/skype.png\" hide-gt-md> <span hide show-gt-md>Skype</span></md-tab></md-tabs><ng-switch on=\"data.selectedIndex\" class=\"tabpanel-container\"><div role=\"tabpanel\" id=\"tab1-content\" aria-labelledby=\"tab1\" ng-switch-when=\"0\" md-swipe-left=\"next()\" md-swipe-right=\"previous()\"><div ng-include=\" 'views/form.html'\" ng-controller=\"FormCtrl\"></div></div><div role=\"tabpanel\" id=\"tab2-content\" aria-labelledby=\"tab2\" ng-switch-when=\"1\" md-swipe-left=\"next()\" md-swipe-right=\"previous()\"><div ng-include=\" 'views/hangout.html'\" ng-controller=\"HangoutCtrl\"></div></div><div role=\"tabpanel\" id=\"tab3-content\" aria-labelledby=\"tab3\" ng-switch-when=\"2\" md-swipe-left=\"next()\" md-swipe-right=\"previous()\"><div ng-include=\" 'views/skype.html' \" ng-controller=\"SkypeCtrl\" style=\"margin-top: -40px\"></div></div></ng-switch></div>");
}]);

angular.module("views/education.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/education.min.html",
    "<section class=\"timeline\"><div class=\"timeline-item\" style=\"margin-bottom:0px !important\"><div class=\"timeline-head\"><i class=\"fa fa-lightbulb-o\"></i></div><div class=\"timeline-head-content\"><h3>Education</h3></div></div></section><section layout=\"row\" ng-repeat=\"(i,edu) in education\"><md-content flex class=\"timeline\"><div><div class=\"timeline-item-date\" hide show-lg show-gt-lg show-md flex>{{edu.date_from.format('YYYY')}}</div><div class=\"timeline-item-trigger\" slide-toggle=\"#edu{{i}}\"><span><i class=\"fa fa-minus-circle\" style=\"color: white\" ng-show=\"xp.collapsed\" ng-click=\"edu.collapsed = !edu.collapsed\"></i> <i class=\"fa fa-plus-circle\" style=\"color: white\" ng-show=\"!xp.collapsed\" ng-click=\"edu.collapsed = !edu.collapsed\"></i></span></div></div><md-content flex><div hide-sm hide-md class=\"timeline-arrow\"><i></i></div><md-content class=\"timeline-item-content\" slide-toggle=\"#edu{{i}}\" flex><h3 class=\"timeline-item-title\" data-toggle=\"collapse\" ng-click=\"edu.collapsed = !edu.collapsed\" data-target=\"#edu{{i}}\">{{edu.title}} <span class=\"place\">in {{edu.location.town}} - {{edu.location.country}}</span></h3><div class=\"slideable\" id=\"edu{{i}}\"><p ng-bind-html=\"edu.description | unsafe\"></p><p ng-show=\"edu.website_url.length>0\"><a href=\"{{edu.website_url}}\" target=\"_blank\" title=\"\" class=\"noprint\">→ View website</a></p></div></md-content></md-content></md-content></section><md-divider></md-divider>");
}]);

angular.module("views/form.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/form.min.html",
    "<md-content class=\"md-padding\" ng-show=\"mailSent==true\" style=\"color: #747474\"><h4>Thank you for contacting me.</h4><p>I will get back to you shortly.</p></md-content><md-content class=\"md-padding\" ng-show=\"mailSent==false\"><form name=\"userForm\"><div layout layout-sm=\"column\"><md-input-container flex><label>Your Name</label><input ng-model=\"user.name\" placeholder=\"Enter your Name\" required></md-input-container><md-input-container flex><label>Email</label><input ng-model=\"user._replyto\" placeholder=\"Enter your Email\" required type=\"email\"></md-input-container></div><md-input-container flex><label>Message</label><textarea ng-model=\"user.message\" placeholder=\"Enter your Message\" required>\n" +
    "            \n" +
    "            </textarea></md-input-container><md-input-container flex><md-button class=\"md-raised md-primary\" ng-click=\"sendMail(userForm)\">Contact Me</md-button></md-input-container></form></md-content>");
}]);

angular.module("views/hangout.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/hangout.min.html",
    "<div id=\"placeholder-div\"></div><p style=\"color:#fff\">A Google account is required to proceed with Hangout.</p>");
}]);

angular.module("views/intro.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/intro.min.html",
    "<md-divider></md-divider><h3>Well about me then..I'm Not just another Australia application developer.<br>My interests are my strengths which include MIS Development & Support,<br>Full-Stack Reactive Web Applications, Rapid MVP's for Startups or Small Business,<br>Cloud Based Services Setup, Deployment and Monitoring such as AWS, GAE & Azure.<br>and Database Design, Development & Maintenance including Oracle, SQL, Postgres, MongoDB & Firebase.<br>Oh And these too....Travelling, Photography, Learning and all things tech based and music.</h3><md-divider></md-divider>");
}]);

angular.module("views/menu-content-header.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/menu-content-header.min.html",
    "<div class=\"logo\"><h2>Paul R Jones <span>Web Application Developer</span></h2></div>");
}]);

angular.module("views/menu-content1.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/menu-content1.min.html",
    "<md-content md-padding md-margin style=\"padding: 10px\"><md-list><md-item><md-item-content><md-button flex ng-click=\"goToAnchor('intro')\"><div class=\"btn-content\"><i class=\"fa fa-lg fa-fire\"></i> <span>Intro</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"goToAnchor('resume')\" flex><div class=\"btn-content\"><i class=\"fa fa-lg fa-book\"></i> <span>Resume</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"goToAnchor('services')\" flex><div class=\"btn-content\"><i class=\"fa fa-lg fa-puzzle-piece\"></i> <span>Services</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"goToAnchor('skills')\" flex><div class=\"btn-content\"><i class=\"fa fa-lg fa-cogs\"></i> <span>Skills</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"goToAnchor('technologies')\" flex><div class=\"btn-content\"><i class=\"fa fa-lg fa-terminal\"></i> <span>Tech</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"swipeLeft()\" flex><div class=\"btn-content\"><i class=\"fa fal-lg fa-mail-forward\"></i> <span>Contact</span></div></md-button></md-item-content></md-item></md-list></md-content>");
}]);

angular.module("views/menu-content2.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/menu-content2.min.html",
    "<md-content md-padding md-margin style=\"padding: 10px\"><div class=\"logo\"><h2>Paul R Jones <span>Web Application Developer</span></h2></div><md-list><md-item><md-item-content><md-button flex ng-click=\"goToAnchor('intro')\" id=\"intro_btn\"><div class=\"btn-content\"><i class=\"fa fa-lg fa-fire\"></i> <span>Intro</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"goToAnchor('resume')\" flex id=\"resume_btn\"><div class=\"btn-content\"><i class=\"fa fa-lg fa-book\"></i> <span>Resume</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"goToAnchor('services')\" flex id=\"service_btn\"><div class=\"btn-content\"><i class=\"fa fa-lg fa-puzzle-piece\"></i> <span>Services</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"goToAnchor('skills')\" flex id=\"skills_btn\"><div class=\"btn-content\"><i class=\"fa fa-lg fa-cogs\"></i> <span>Skills</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"goToAnchor('technologies')\" flex><div class=\"btn-content\"><i class=\"fa fa-lg fa-terminal\"></i> <span>Tech</span></div></md-button></md-item-content></md-item><md-divider></md-divider><md-item><md-item-content><md-button ng-click=\"swipeLeft()\" flex id=\"contact_btn\"><div class=\"btn-content\"><i class=\"fa fal-lg fa-mail-forward\"></i> <span>Contact</span></div></md-button></md-item-content></md-item></md-list><div class=\"bg-portrait\" ng-show=\"showPortrait\"></div></md-content>");
}]);

angular.module("views/menu.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/menu.min.html",
    "<div ng-controller=\"AppCtrl\" layout=\"column\" style=\"min-height:100%\" ng-swipe-right=\"swipeRight()\" ng-swipe-left=\"swipeLeft()\"><section layout=\"row\" layout-align=\"end start\"><md-sidenav class=\"md-sidenav-left md-whiteframe-z2 large-sidenav\" class=\"large-sidenav\" id=\"largeLeft\" md-component-id=\"largeLeft\" layout=\"row\"><div ng-include=\"'views/menu-content-header.html'\" flex=\"50\" style=\"background-color: #747474\"></div><div ng-include=\" 'views/menu-content1.html'\" flex=\"50\"></div></md-sidenav><md-sidenav class=\"md-sidenav-left md-whiteframe-z3\" id=\"smallLeft\" md-component-id=\"smallLeft\" layout=\"column\"><div ng-include=\"'views/menu-content-header.html'\" style=\"background-color: #fff\"></div><div ng-include=\" 'views/menu-content1.html'\"></div></md-sidenav><md-sidenav class=\"md-sidenav-right md-whiteframe-z3\" md-component-id=\"right\" id=\"right\"><div ng-include=\" 'views/contact.html'\" ng-controller=\"ContactCtrl\"></div></md-sidenav><md-content layout=\"left\" show hide-gt-md style=\"background-color: transparent\" ng-show=\"isTouch == false\" flex=\"10\"><i class=\"fa fa-4x fa-bars\" hide show-md style=\"background-color: #fff;border : 3px solid #575757;border-radius: 5px;padding: 5px;\n" +
    "               position:fixed;\n" +
    "               left: 10px;\n" +
    "               top: 10px\" ng-click=\"toggleLeft2()\"></i> <i class=\"fa fa-2x fa-bars\" hide show-sm style=\"background-color: #fff;border : 3px solid #575757;border-radius: 5px;padding: 5px;\n" +
    "               position:fixed;\n" +
    "               left: 10px;\n" +
    "               top: 10px\" ng-click=\"toggleLeft()\"></i></md-content><md-content layout=\"left\" hide-sm flex=\"25\" style=\"position:fixed;top : 25px;left :2%;padding : 0px !important\"><div ng-include=\"'views/menu-content2.html'\" ng-controller=\"MenuCtrl\"></div></md-content><md-content flex-lg=\"75\" flex-gt-lg=\"80\" flex-sm=\"{{flex_small_content}}\" flex-md=\"70\" layout=\"right\" class=\"md-padding\" style=\"background-color: transparent\"><div layout=\"column\" layout-fill layout-align=\"top center\"><section class=\"intro\" id=\"intro\"><div id=\"intro-name\"><span>Paul</span><div class=\"fade-show-container\"><img style=\"vertical-align:middle\" class=\"fade-show\" src=\"img/Slide.png\" id=\"slideImg\" ng-show=\"showSlide\"> <img style=\"vertical-align:middle\" class=\"fade-show\" src=\"img/PRJones 2.png\" alt=\"Paul R Jones\" id=\"photoImg\" ng-show=\"showFace\"></div><span>R Jones</span><div style=\"clear:both\"></div></div><div ng-include=\" 'views/intro.html'\"></div></section><section class=\"section nicesection\" id=\"resume\"><div><h2 class=\"mtcon-title\">Resume</h2></div><div ng-include=\" 'views/professional.html'\" ng-controller=\"ProCtrl\"></div><div ng-include=\" 'views/education.html'\" ng-controller=\"EducationCtrl\"></div></section><section class=\"section nicesection\" id=\"services\"><div><h2 class=\"mtcon-title\">Services</h2></div><div ng-include=\" 'views/services.html'\" ng-controller=\"ServiceCtrl\"></div></section><section class=\"section nicesection\" id=\"skills\"><div><h2 class=\"mtcon-title\">Skills</h2></div><div ng-include=\" 'views/skills.html'\" ng-controller=\"SkillsCtrl\"></div></section><section class=\"section nicesection\" id=\"technologies\"><div><h2 class=\"mtcon-title\">Technology used for this page</h2></div><div ng-include=\" 'views/technologies.html'\" ng-controller=\"TechnologiesCtrl\"></div></section></div><div flex></div></md-content></section></div>");
}]);

angular.module("views/portfolio.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/portfolio.min.html",
    "<section id=\"works\" class=\"section mtcon\"><div class=\"row\"><h2 class=\"mtcon-title\">Works</h2><div class=\"span8 short-dec\"><p>The Sky People have sent us a message... that they can take whatever they want. That no one can stop them. Well, we will send them a message. You ride out as fast as the wind can carry you. You tell the other clans to come. Tell them Toruk Macto calls to them! You fly now, with me! My brothers! Sisters! And we will show the Sky People... that they cannot take whatever they want! And that this... this is our land!</p></div></div><div class=\"row\"><div id=\"options\" class=\"clearfix\"><ul id=\"filters\" class=\"option-set clearfix\" data-option-key=\"filter\"><li><a href=\"#filter\" data-option-value=\"*\" class=\"selected\">all works</a></li><li ng-repeat=\"folio in portfolio\"><a href=\"#filter\" data-option-value=\"{{folio.name}}\">{{folio.name}}</a></li></ul></div><div id=\"portfolio\" class=\"clearfix\"><div ng-repeat=\"folio in portfolio\" class=\"block {{folio.name}}\"><div class=\"view view-first\"><div class=\"tringle\"></div><img src=\"img/work/1/1.jpg\" alt=\"\"><div class=\"mask\"><a class=\"info\" data-rel=\"prettyPhoto\" href=\"img/big/1.jpg\"></a> <a class=\"link\" href=\"#\"></a></div></div><div class=\"des\"><h4>{{folio.title}}</h4><p>{{folio.description}}</p></div></div></div></div></section>");
}]);

angular.module("views/professional.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/professional.min.html",
    "<section class=\"timeline\"><div class=\"timeline-item\" style=\"margin-bottom:0px !important\"><div class=\"timeline-head\"><i class=\"fa fa-lightbulb-o\"></i></div><div class=\"timeline-head-content\"><h3>Work Experience</h3></div></div></section><section layout=\"row\" ng-repeat=\"(i,xp) in experience\"><md-content flex class=\"timeline\"><div><div class=\"timeline-item-date\" hide show-gt-lg flex>{{xp.date_from.format('MMM YYYY')}} <span>⇢ {{xp.date_to.format(\"MMM YYYY\")}}</span></div><div class=\"timeline-item-date\" hide show-lg show-md flex>{{xp.date_from.format('YYYY')}} <span>⇢ {{xp.date_to.format(\"YYYY\")}}</span></div><div class=\"timeline-item-trigger\" slide-toggle=\"#xp{{i}}\"><span><i class=\"fa fa-minus-circle\" style=\"color: white\" ng-show=\"xp.collapsed\" ng-click=\"xp.collapsed = !xp.collapsed\"></i> <i class=\"fa fa-plus-circle\" style=\"color: white\" ng-show=\"!xp.collapsed\" ng-click=\"xp.collapsed = !xp.collapsed\"></i></span></div></div><md-content flex><div hide-sm hide-md class=\"timeline-arrow\"><i></i></div><md-content class=\"timeline-item-content\" flex><h3 class=\"timeline-item-title\" slide-toggle=\"#xp{{i}}\" ng-click=\"xp.collapsed = !xp.collapsed\">{{xp.title}} <span class=\"place\">@ {{xp.company_name}}</span></h3><div class=\"slideable\" id=\"xp{{i}}\"><p ng-bind-html=\"xp.description | unsafe\"></p><p ng-show=\"xp.website_url.length>0\"><a href=\"{{xp.website_url}}\" target=\"_blank\" title=\"\" class=\"noprint\">→ View website</a></p><label ng-repeat=\"tag in xp.tags\" class=\"tag\">{{tag}}</label></div></md-content></md-content></md-content></section><md-divider></md-divider>");
}]);

angular.module("views/services.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/services.min.html",
    "<section layout=\"row\" layout-align=\"center center\"><md-content flex=\"90\"><p style=\"color: #6C6662;padding:0px 15px;background-color:transparent;font: 14px 'PT Sans',sans-serif\">I do full-time and part-time remote jobs online, and I am usually open to use any communication media available (Skype, Hangout, Phone, VoIP).</p></md-content></section><section layout=\"row\" layout-align=\"center start\" layout-wrap layout-margin style=\"padding-bottom:30px\"><md-content layout-margin ng-repeat=\"(i, service) in services\" flex-gt-md=\"30\" flex-md=\"80\" flex-sm=\"90\"><flippy class=\"fancy my-fancy\" ng-click=\"flip()\" ng-mouseenter=\"flip()\" ng-mouseleave=\"flip()\" flip-duration=\"800\" timing-function=\"ease-in-out\"><flippy-front><img ng-if=\"service.image !== false\" src=\"{{service.image}}\"><div ng-if=\"service.image === false\"><canvas width=\"138\" height=\"138\" id=\"myCanvas\" style=\"background-color: #000;border-radius : 75px\"><p>Anything in here will be replaced on browsers that support the canvas element</p></canvas><div id=\"tags\"><a href=\"\" weight=\"20\">PHP5</a> <a href=\"\" weight=\"10\">Zend1</a> <a href=\"\" weight=\"20\">AngularJS</a> <a href=\"\" weight=\"5\">EmberJS</a> <a href=\"\" weight=\"15\">Javascript</a> <a href=\"\" weight=\"15\">HTML5</a> <a href=\"\" weight=\"15\">Foundation</a> <a href=\"\" weight=\"15\">Bootstrap</a> <a href=\"\" weight=\"18\">Apache2</a> <a href=\"\" weight=\"18\">MySQL</a> <a href=\"\" weight=\"15\">MariaDB</a> <a href=\"\" weight=\"12\">MongoDB</a> <a href=\"\" weight=\"15\">MEAN.js</a> <a href=\"\" weight=\"10\">NodeJS</a> <a href=\"\" weight=\"8\">Java</a> <a href=\"\" weight=\"12\">Yii</a> <a href=\"\" weight=\"18\">Sphinx</a> <a href=\"\" weight=\"10\">Code Igniter</a> <a href=\"\" weight=\"18\">REST</a> <a href=\"\" weight=\"15\">SOAP</a> <a href=\"\" weight=\"18\">CSS3</a> <a href=\"\" weight=\"12\">Jasmine</a> <a href=\"\" weight=\"12\">Karma</a> <a href=\"\" weight=\"5\">Python</a> <a href=\"\" weight=\"10\">Meteor</a></div></div><h2 style=\"font-size : 20px\">{{service.title}}</h2></flippy-front><flippy-back><h2 style=\"font-size : 20px\">{{service.title}}</h2><p ng-bind-html=\"service.description | unsafe\"></p></flippy-back></flippy></md-content></section>");
}]);

angular.module("views/skype.min.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/skype.min.html",
    "<div id=\"SkypeButton_Call_montpellier_1001net\"></div><p style=\"color:#fff\">Do you Skype installed on this computer?</p>");
}]);

angular.module("views/skills.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/skills.html",
    "<section layout=\"row\"   layout-align-gt-md=\"center start\" layout-wrap layout-padding layout-margin>\n" +
    "    \n" +
    "    <md-content flex-gt-md=\"30\"  flex-md=\"100\" flex-sm=\"100\"  style=\"background-color: #EBEBEB;color: #000\" layout-margin>\n" +
    "        \n" +
    "        <div class=\"skill-title\">Programming</div>\n" +
    "        <div ng-repeat=\"(i, coding) in skills.coding\">\n" +
    "            <div style=\"text-align: center;width: 190px;font-weight: bold;font-size: 15px;margin: auto;margin-top: 10px;margin-bottom: 10px;background-color: #fff;border-radius:10px;\">\n" +
    "                {{coding.name}}\n" +
    "            </div>\n" +
    "            \n" +
    "            <div style=\"clear:both\"></div>\n" +
    "            \n" +
    "            \n" +
    "            <md-content flex=\"60\"></md-content>\n" +
    "            <md-list style=\"background-color:#EBEBEB\">\n" +
    "                <md-item ng-repeat=\"(j,code) in coding.languages\" >\n" +
    "                    <md-item-content style=\"background-color:#EBEBEB\">\n" +
    "                        <md-content flex=\"40\" style=\"background-color:#EBEBEB;font-size: 12px;text-transform: uppercase;border: 1px solid transparent;text-align: right;padding-right: 10px;height: 20px;\">\n" +
    "                            {{code.name}}\n" +
    "                        </md-content>\n" +
    "                        <md-content flex=\"60\" style=\"background-color:#EBEBEB\">\n" +
    "                            <div data-ng-class=\"{'score-red': code.percentage<=1,'score-yellow': code.percentage>1 && code.percentage<=3.5,'score-green': code.percentage>3.5}\" style=\"border: 1px solid #fff;height: 20px;width: {{code.percentage * 20}}%\"\">\n" +
    "\n" +
    "                            </div>\n" +
    "                        </md-content>\n" +
    "\n" +
    "                    </md-item-content>\n" +
    "                </md-item>\n" +
    "            </md-list> \n" +
    "            \n" +
    "        </div>\n" +
    "\n" +
    "    </md-content>\n" +
    "\n" +
    "    <md-content flex-gt-md=\"30\"  flex-md=\"100\" flex-sm=\"100\"  style=\"background-color: #EBEBEB;color: #000\" layout-margin>\n" +
    "        \n" +
    "        <div class=\"skill-title\">\n" +
    "            Sys Admin\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"(i, coding) in skills.server\">\n" +
    "            <div style=\"text-align: center;width: 190px;font-weight: bold;font-size: 15px;margin: auto;margin-top: 10px;margin-bottom: 10px;background-color: #fff;border-radius:10px;\">\n" +
    "                {{coding.name}}\n" +
    "            </div>\n" +
    "            \n" +
    "            <div style=\"clear:both\"></div>\n" +
    "            \n" +
    "            \n" +
    "            <md-content flex=\"60\"></md-content>\n" +
    "            <md-list style=\"background-color:#EBEBEB\">\n" +
    "                <md-item ng-repeat=\"(j,code) in coding.languages\" >\n" +
    "                    <md-item-content style=\"background-color:#EBEBEB\">\n" +
    "                        <md-content flex=\"40\" style=\"background-color:#EBEBEB;font-size: 12px;text-transform: uppercase;border: 1px solid transparent;text-align: right;padding-right: 10px;height: 20px;\">\n" +
    "                            {{code.name}}\n" +
    "                        </md-content>\n" +
    "                        <md-content flex=\"60\" style=\"background-color:#EBEBEB\">\n" +
    "                            <div data-ng-class=\"{\n" +
    "                                'score-red': code.percentage<=1,\n" +
    "                                'score-yellow': code.percentage>1 && code.percentage<=3.5,\n" +
    "                                'score-green': code.percentage>3.5\n" +
    "                            }\" style=\"border: 1px solid #fff;height: 20px;width: {{code.percentage * 20}}%\"\">\n" +
    "\n" +
    "                            </div>\n" +
    "                        </md-content>\n" +
    "\n" +
    "                    </md-item-content>\n" +
    "                </md-item>\n" +
    "            </md-list> \n" +
    "            \n" +
    "        </div>\n" +
    "\n" +
    "    </md-content>\n" +
    "\n" +
    "    <md-content flex-gt-md=\"30\"  flex-md=\"100\" flex-sm=\"100\"  style=\"background-color: #EBEBEB;color: #000\" layout-margin>\n" +
    "        \n" +
    "        <div class=\"skill-title\">\n" +
    "            Softwares\n" +
    "        </div>\n" +
    "        <div ng-repeat=\"(i, coding) in skills.softwares\">\n" +
    "            <div style=\"text-align: center;width: 190px;font-weight: bold;font-size: 15px;margin: auto;margin-top: 10px;margin-bottom: 10px;background-color: #fff;border-radius:10px;\">\n" +
    "                {{coding.name}}\n" +
    "            </div>\n" +
    "            \n" +
    "            <div style=\"clear:both\"></div>\n" +
    "            \n" +
    "            \n" +
    "            <md-content flex=\"60\"></md-content>\n" +
    "            <md-list style=\"background-color:#EBEBEB\">\n" +
    "                <md-item ng-repeat=\"(j,code) in coding.languages\" >\n" +
    "                    <md-item-content style=\"background-color:#EBEBEB\">\n" +
    "                        <md-content flex=\"40\" style=\"background-color:#EBEBEB;font-size: 12px;text-transform: uppercase;border: 1px solid transparent;text-align: right;padding-right: 10px;height: 20px;\">\n" +
    "                            {{code.name}}\n" +
    "                        </md-content>\n" +
    "                        <md-content flex=\"60\" style=\"background-color:#EBEBEB\">\n" +
    "                            <div data-ng-class=\"{\n" +
    "                                'score-red': code.percentage<=1,\n" +
    "                                'score-yellow': code.percentage>1 && code.percentage<=3.5,\n" +
    "                                'score-green': code.percentage>3.5\n" +
    "                            }\" style=\"border: 1px solid #fff;height: 20px;width: {{code.percentage * 20}}%\"\">\n" +
    "\n" +
    "                            </div>\n" +
    "                        </md-content>\n" +
    "\n" +
    "                    </md-item-content>\n" +
    "                </md-item>\n" +
    "            </md-list> \n" +
    "            \n" +
    "        </div>\n" +
    "\n" +
    "    </md-content>\n" +
    "</section>\n" +
    "\n" +
    "");
}]);
