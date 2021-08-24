<!-- start: sidebar -->
<aside id="sidebar-left" class="sidebar-left">

    <div class="sidebar-header">
        <div class="sidebar-title">
            Navigation
        </div>
        <div class="sidebar-toggle d-none d-md-block" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
            <i class="fas fa-bars" aria-label="Toggle sidebar"></i>
        </div>
    </div>

    <div class="nano">
        <div class="nano-content">
            <nav id="menu" class="nav-main" role="navigation">

                <ul class="nav nav-main">
                    <li class="nav-parent">
                        <a class="nav-link" href="#">
                            <i class="bx bx-user-plus" aria-hidden="true"></i>
                            <span>User manager</span>
                        </a>
                        <ul class="nav nav-children">
                            <li>
                                <a class="nav-link" href="#">
                                    Create user
                                </a>
                            </li>
                            <li>
                                <a class="nav-link" href="#">
                                    Role permission
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a class="nav-link" href="/rcca/">
                            <i class="bx bx-home-alt" aria-hidden="true"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="/rcca/create-task">
                            <i class="bx bx-task" aria-hidden="true"></i>
                            <span>Create task</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="/rcca/tasks">
                            <i class="bx bx-task" aria-hidden="true"></i>
                            <span>Created tasks</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="/rcca/my-tasks">
                            <i class="bx bx-task" aria-hidden="true"></i>
                            <span>My tasks</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="/rcca/subordinates-tasks">
                            <i class="bx bx-task" aria-hidden="true"></i>
                            <span>Subordinates created tasks</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <script>
            // Maintain Scroll Position
            if (typeof localStorage !== 'undefined') {
                if (localStorage.getItem('sidebar-left-position') !== null) {
                    var initialPosition = localStorage.getItem('sidebar-left-position'),
                        sidebarLeft = document.querySelector('#sidebar-left .nano-content');

                    sidebarLeft.scrollTop = initialPosition;
                }
            }
        </script>


    </div>

</aside>
<!-- end: sidebar -->
