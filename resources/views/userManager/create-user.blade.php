@extends('layouts.master');

@section('main-content')
    <section id="app">
        <div class="row">
            <div class="col-lg-6">
                <form id="form" action="#" class="form-horizontal">
                    <section class="card">
                        <header class="card-header">

                            <h2 class="card-title">Create user</h2>
                            <p class="card-subtitle">
                                Create a user with menu access
                            </p>
                        </header>
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="user-name-input" class="col-sm-3 control-label text-sm-right pt-2">Full Name <span class="required">*</span></label>
                                <div class="col-sm-9">
                                    <input type="text" id="user-name-input" name="Name" class="form-control" placeholder="user name" required/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for= "user-email-input" class="col-sm-3 control-label text-sm-right pt-2">Email <span class="required">*</span></label>
                                <div class="col-sm-9">
                                    <div class="input-group">
													<span class="input-group-prepend">
														<span class="input-group-text">
															<i class="fas fa-envelope"></i>
														</span>
													</span>
                                        <input  id="user-email-input" type="email" name="Email" class="form-control" placeholder="user email" required/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="user-name-input" class="col-sm-3 control-label text-sm-right pt-2">User name</label>
                                <div class="col-sm-9">
                                    <input id="user-name-input" type="text" name="UserName" class="form-control" placeholder="user name" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="user-designation-input" class="col-sm-3 control-label text-sm-right pt-2">Designation</label>
                                <div class="col-sm-9">
                                    <input id="user-designation-input" type="text" name="Designation" class="form-control" placeholder="designation" />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-3 control-label text-sm-right pt-2">Menu access <span class="required">*</span></label>
                                <div class="col-sm-9">
                                    @foreach($menus as $menu)
                                        <div class="checkbox-custom chekbox-primary">
                                            <input id="for-menu-{{$menu->MenuID}}" value="{{$menu->MenuID}}" type="checkbox" name="for[]" required />
                                            <label for="for-menu-{{$menu->MenuID}}">{{$menu->MenuName}}</label>
                                        </div>
                                    @endforeach
                                    <label class="error" for="for[]"></label>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <div class="row justify-content-end">
                                <div class="col-sm-9">
                                    <button class="btn btn-primary">Submit</button>
                                    <button type="reset" class="btn btn-default">Reset</button>
                                </div>
                            </div>
                        </footer>
                    </section>
                </form>
            </div>
        </div>
    </section>
@endsection
