﻿using System;
using System.Collections.Generic;
using DigitalAlbum.CustomControls.CustomViews;
using Xamarin.Forms;

namespace DigitalAlbum
{
    public partial class HomePage : BaseContentPage
    {
        //public static HomePage homePage;
        //public HomePage
        HomePageViewModel homePageViewModel;


        protected override void OnAppearing()
        {
            base.OnAppearing();
            MessagingCenter.Subscribe<GlobalHeader, string>(this, "Memories Hub", (sender, args)=>//(GlobalHeader arg1, string arg2) =>
            {
                // do something whenever the "HomePage - key" message is sent
                try
                {
                    var ParentPage = (MasterDetailPage)this.Parent;
                    ParentPage.IsPresented = (ParentPage.IsPresented == false) ? true : false;
                }
                catch (Exception ex)
                {
                    var msg = ex.Message + "\n" + ex.StackTrace;
                    System.Diagnostics.Debug.WriteLine(msg);
                }
            });
            MessagingCenter.Subscribe<GlobalHeader>(this, "Add", (sender) =>//(GlobalHeader arg1, string arg2) =>
            {
                // do something whenever the "HomePage - key" message is sent
                try
                {
                    homePageViewModel.AddMemoryClick.Execute(null);
                }
                catch (Exception ex)
                {
                    var msg = ex.Message + "\n" + ex.StackTrace;
                    System.Diagnostics.Debug.WriteLine(msg);
                }
            });
        }

        protected override void OnDisappearing()
        {
            base.OnDisappearing();
            MessagingCenter.Unsubscribe<GlobalHeader, string>(this, "My Memories");
            MessagingCenter.Unsubscribe<GlobalHeader>(this, "Add");
        }

        public HomePage()
        {
            homePageViewModel = new HomePageViewModel(Navigation);
            BindingContext = homePageViewModel;
            //PageNavigation = "Master";

            //PageNavigation = ((MasterDetailPage)(this.Parent));
            InitializeComponent();
            NaviType = "Master";
            PageTitle = "Memories Hub";
            NaviImage = ValueConverters.TextToUniCodeSymbolCoverter.GetSymbolValue("HamBurger");



            listViewCompanions.ItemSelected += (object sender, SelectedItemChangedEventArgs e) => 
            {
                try
                {
                    var selectedMemory = ((ListView)sender).SelectedItem as MemoriesData;
                    if (selectedMemory == null)
                    {
                        return;
                    }
                    else
                    {
                        Navigation.PushModalAsync(new MemoryDetailPage(selectedMemory));
                    }
                    ((ListView)sender).SelectedItem = null;
                }
                catch(Exception ex)
                {
                    var msg = ex.Message;
                }

            };
        }

        void OpenNavigationMenu(object sender, EventArgs args)
        {
            try
            {
                var ParentPage = (MasterDetailPage)this.Parent;
                ParentPage.IsPresented = (ParentPage.IsPresented == false) ? true : false;
                //HomePage.homePage.Navigation.PushModalAsync(new CreateMemory());
                //DisplayAlert("ALert", "HelloWorld", "Ok");
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
            }
        }



        void AddMemoryClick(object sender, EventArgs args)
        {
            try
            {
                homePageViewModel.AddMemoryClick.Execute(null);
            }
            catch (Exception ex)
            {
                var msg = ex.Message + "\n" + ex.StackTrace;
                System.Diagnostics.Debug.WriteLine(msg);
            }

        }

        //void AddNewMemory(object sender, EventArgs args)
        //{
        //    try
        //    {
        //        //HomePage.homePage.Navigation.PushModalAsync(new CreateMemory());
        //        //DisplayAlert("ALert", "HelloWorld", "Ok");
        //    }
        //    catch (Exception ex)
        //    {
        //        var msg = ex.Message;
        //    }
        //}

        protected override bool OnBackButtonPressed()
        {
            return true;
        }
    }
}
