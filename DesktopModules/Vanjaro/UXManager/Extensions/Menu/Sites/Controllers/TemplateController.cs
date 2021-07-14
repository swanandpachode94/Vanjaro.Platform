﻿using DotNetNuke.Web.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Vanjaro.Common.ASPNET.WebAPI;
using Vanjaro.Common.Engines.UIEngine;
using static Vanjaro.Core.Managers;

namespace Vanjaro.UXManager.Extensions.Menu.Sites.Controllers
{
    [AuthorizeAccessRoles(AccessRoles = "host")]
    [ValidateAntiForgeryToken]
    public class TemplateController : UIEngineController
    {
#if RELEASE
        static string LibraryUrl = "https://library.vanjaro.cloud";
#else
        static string LibraryUrl = "http://library.vanjaro.local";
#endif
        internal static List<IUIData> GetData()
        {
            Dictionary<string, IUIData> Settings = new Dictionary<string, IUIData>();
            Settings.Add("LibraryUrl", new UIData { Name = "LibraryUrl", Value = LibraryUrl });
            Settings.Add("LibraryMidUrl", new UIData { Name = "LibraryMidUrl", Value = (LibraryUrl + "/templates/type/site/tid/") });
            Settings.Add("Themes", new UIData { Name = "Themes", Options = ThemeManager.GetThemes(), Value = ThemeManager.CurrentTheme.GUID });
            return Settings.Values.ToList();
        }

        public override string AccessRoles()
        {
            return Factories.AppFactory.GetAccessRoles(UserInfo);
        }
    }
}