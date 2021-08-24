<!doctype html>
<html class="fixed">
<head>

    <!-- Basic -->
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{csrf_token()}}">

    <title>Colgate palmolive</title>

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <!-- Web Fonts  -->
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">

    <!-- Vendor CSS -->
    <link rel="stylesheet" href="{{asset('vendor/bootstrap/css/bootstrap.css')}}" />
    <link rel="stylesheet" href="{{asset('vendor/animate/animate.compat.css')}}">

    <link rel="stylesheet" href="{{asset('vendor/font-awesome/css/all.min.css')}}" />
    <link rel="stylesheet" href="{{asset('vendor/boxicons/css/boxicons.min.css')}}" />
    <link rel="stylesheet" href="{{asset('vendor/magnific-popup/magnific-popup.css')}}" />
    <link rel="stylesheet" href="{{asset('vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css')}}" />

    <!--(remove-empty-lines-end)-->

    <!-- Theme CSS -->
    <link rel="stylesheet" href="{{asset('theme/css/theme.css')}}" />


    <!--(remove-empty-lines-end)-->



    <!-- Theme Custom CSS -->
    <link rel="stylesheet" href="{{asset('theme/css/custom.css')}}">

    <!-- Head Libs -->
    <script src="{{asset('vendor/modernizr/modernizr.js')}}"></script>
    <link href="https://cdn.jsdelivr.net/npm/tom-select@1.7.5/dist/css/tom-select.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/tom-select@1.7.5/dist/js/tom-select.complete.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</head>
<body>
<section class="body">
{{--    <header class="header">--}}

{{--        <!-- start: search & user box -->--}}
{{--        <div class="header-right">--}}

{{--            <div id="userbox" class="userbox">--}}
{{--                <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">--}}
{{--                    <figure class="profile-picture">--}}
{{--                        <img src="img/!logged-user.jpg" alt="Joseph Doe" class="rounded-circle" data-lock-picture="img/!logged-user.jpg" />--}}
{{--                    </figure>--}}
{{--                    <div class="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">--}}
{{--                        <span class="name">{{auth()->user()->UserName}}</span>--}}
{{--                        <span class="role">{{auth()->user()->Designation}}</span>--}}
{{--                    </div>--}}

{{--                    <i class="fa custom-caret"></i>--}}
{{--                </a>--}}

{{--                <div class="dropdown-menu">--}}
{{--                    <ul class="list-unstyled mb-2">--}}
{{--                        <li class="divider"></li>--}}
{{--                        <li>--}}
{{--                            <a role="menuitem" tabindex="-1" href="pages-user-profile.html"><i class="bx bx-user-circle"></i> My Profile</a>--}}
{{--                        </li>--}}
{{--                        <li>--}}
{{--                            <a role="menuitem" tabindex="-1" href="#" data-lock-screen="true"><i class="bx bx-lock"></i> Lock Screen</a>--}}
{{--                        </li>--}}
{{--                        <li>--}}
{{--                            <a role="menuitem" tabindex="-1" href="pages-signin.html"><i class="bx bx-power-off"></i> Logout</a>--}}
{{--                        </li>--}}
{{--                    </ul>--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--        <!-- end: search & user box -->--}}
{{--    </header>--}}
    <!-- end: header -->
    <div id="modal-root"></div>
    <div id="app">

    </div>
</section>

<!-- Vendor -->
<script src="{{asset('vendor/jquery/jquery.js')}}"></script>
<script src="{{asset('vendor/jquery-browser-mobile/jquery.browser.mobile.js')}}"></script>
{{--  <script src="{{asset('vendor/jquery-cookie/jquery.cookie.js')}}"></script>  --}}
<script src="{{asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js')}}"></script>
<script src="{{asset('vendor/common/common.js')}}"></script>
<script src="{{asset('vendor/nanoscroller/nanoscroller.js')}}"></script>
{{--  <script src="{{asset('vendor/magnific-popup/jquery.magnific-popup.js')}}"></script>  --}}
{{--  <script src="{{asset('vendor/jquery-placeholder/jquery.placeholder.js')}}"></script>  --}}

<!-- Specific Page Vendor -->


<!--(remove-empty-lines-end)-->

<!-- Theme Base, Components and Settings -->
<script src="{{asset('theme/js/theme.js')}}"></script>

<!-- Theme Custom -->
<script src="{{asset('theme/js/custom.js')}}"></script>

<!-- Theme Initialization Files -->
<script src="{{asset('theme/js/theme.init.js')}}"></script>

<script src="{{asset('js/app.js')}}"></script>
<!-- Analytics to Track Preview Website -->
{{--  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-42715764-8', 'auto');
    ga('send', 'pageview');
</script>  --}}
{{--  <script src="{{asset('vendor/popper/umd/popper.min.js')}}"></script>  --}}
<script src="{{asset('vendor/bootstrap/js/bootstrap.js')}}"></script>
</body>
</html>
