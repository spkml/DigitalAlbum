﻿using System;
using Android.Graphics;
using DigitalAlbum;
using DigitalAlbum.Droid;
using Xamarin.Forms;
using Xamarin.Forms.Platform.Android;

[assembly: ExportRenderer(typeof(CustomLayout), typeof(CustomLayoutRender))]
namespace DigitalAlbum.Droid
{
    public class CustomLayoutRender : VisualElementRenderer<StackLayout>
    {
        public CustomLayoutRender() { }

        private float _cornerRadius;
        private RectF _bounds;
        private Path _path;
        private Xamarin.Forms.Color StartColor { get; set; }
        private Xamarin.Forms.Color EndColor { get; set; }
        private GradientStyle gradientStyle { get; set; }
        CustomLayout stack;

        protected override void OnElementChanged(ElementChangedEventArgs<StackLayout> e)
        {
            base.OnElementChanged(e);

            if (e.OldElement != null || Element == null)
            {
                return;
            }
            try
            {
                stack = e.NewElement as CustomLayout;

                this.StartColor = stack.StartColor;
                this.EndColor = stack.EndColor;
                this.gradientStyle = stack.GradientDirection;


                _cornerRadius = 0.0f;
                try
                {
                    if (stack.CornerWRT == CornerRadiusReference.WRTHeightRequest && stack.CornerRadius == 0)
                    {
                        _cornerRadius = (float)(stack.HeightRequest);
                    }
                    else if (stack.CornerWRT == CornerRadiusReference.WRTWidthRequest && stack.CornerRadius == 0)
                    {
                        _cornerRadius = (float)(stack.WidthRequest);
                    }
                    else
                    {
                        _cornerRadius = (float)(stack.CornerRadius);
                    }
                }
                catch (Exception ex)
                {
                    var msg = ex.Message;
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(@"ERROR:", ex.Message);
            }
        }

        protected override void OnSizeChanged(int w, int h, int oldw, int oldh)
        {
            base.OnSizeChanged(w, h, oldw, oldh);
            if (w != oldw && h != oldh)
            {
                _bounds = new RectF(0, 0, w, h);
            }

            _path = new Path();
            _path.Reset();
            _path.AddRoundRect(_bounds, _cornerRadius, _cornerRadius, Path.Direction.Cw);
            //_path.AddRoundRect(_bounds, _cornerRadius, _cornerRadius, Path.Direction.Ccw);
            _path.Close();
        }

        protected override void DispatchDraw(Canvas canvas)
        {
            int height = Height;
            int width = Width;

            if (gradientStyle == GradientStyle.Vertical)
            {
                width = 0;
            }
            else
            {
                height = 0;
            }

            /*
            #region for Vertical Gradient  
            var gradient = new Android.Graphics.LinearGradient(0, 0, 0, Height,
            #endregion

            //#region for Horizontal Gradient  
            //var gradient = new Android.Graphics.LinearGradient(0, 0, Width, 0,

            this.StartColor.ToAndroid(),
            this.EndColor.ToAndroid(),
            Android.Graphics.Shader.TileMode.Mirror);
            //#endregion
            */


            var gradient = new Android.Graphics.LinearGradient(0, 0, width, height, this.StartColor.ToAndroid(), this.EndColor.ToAndroid(), Android.Graphics.Shader.TileMode.Mirror);
            var paint = new Android.Graphics.Paint()
            {
                Dither = true,
            };


            paint.SetShader(gradient);
            canvas.Save();
            canvas.ClipPath(_path);
            canvas.DrawPaint(paint);
            try
            {
                if (stack.HasBorderColor == true && stack.BorderColor != null)
                {
                    var borderPaint = new Paint();
                    borderPaint.AntiAlias = true;
                    borderPaint.StrokeWidth = 2;
                    borderPaint.SetStyle(Paint.Style.Stroke);
                    borderPaint.Color = stack.BorderColor.ToAndroid();//global::Android.Graphics.Color.White;
                    canvas.DrawPath(_path, borderPaint);
                }
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
            }
            //base.Draw(canvas);
            base.DispatchDraw(canvas);
            canvas.Restore();
        }

        protected override void OnElementPropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs e)
        {
            base.OnElementPropertyChanged(sender, e);
        }
    }
}