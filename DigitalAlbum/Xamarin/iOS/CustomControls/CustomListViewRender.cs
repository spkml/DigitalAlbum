﻿using System;

using Xamarin.Forms;
using DigitalAlbum;
using DigitalAlbum.iOS;
using Xamarin.Forms.Platform.iOS;

[assembly: ExportRenderer(typeof(CustomListView), typeof(CustomListViewRender))]
namespace DigitalAlbum.iOS
{
    public class CustomListViewRender : ListViewRenderer
    {
        public CustomListViewRender() { }
    }
}

